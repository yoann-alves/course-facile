import { useState, useCallback, useEffect } from 'react';
import { useToast } from './useToast';

interface UseFetchOptions<T> {
  url?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
  autoFetch?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useFetch<T>({
  url,
  method = 'GET',
  headers = {},
  body,
  autoFetch = false,
  onSuccess,
  onError
}: UseFetchOptions<T> = {}) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null
  });
  
  const { showToast } = useToast();
  
  const fetchData = useCallback(async (
    fetchUrl = url,
    fetchMethod = method,
    fetchHeaders = headers,
    fetchBody = body
  ) => {
    if (!fetchUrl) {
      return;
    }
    
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const options: RequestInit = {
        method: fetchMethod,
        headers: {
          'Content-Type': 'application/json',
          ...fetchHeaders
        }
      };
      
      if (fetchBody && fetchMethod !== 'GET') {
        options.body = JSON.stringify(fetchBody);
      }
      
      const response = await fetch(fetchUrl, options);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      setState(prev => ({ ...prev, data, loading: false }));
      onSuccess?.(data);
      
      return data;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error(String(error));
      setState(prev => ({ ...prev, error: errorObj, loading: false }));
      showToast(errorObj.message, 'error');
      onError?.(errorObj);
      
      return null;
    }
  }, [url, method, headers, body, onSuccess, onError, showToast]);
  
  useEffect(() => {
    if (autoFetch && url) {
      fetchData();
    }
  }, [autoFetch, url, fetchData]);
  
  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null
    });
  }, []);
  
  return {
    ...state,
    fetchData,
    reset
  };
} 