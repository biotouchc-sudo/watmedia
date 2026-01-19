"use client";

import { useState, useCallback, useRef } from "react";

/**
 * 🧪 DEV TOOLS & SUPER MYTHICAL (L260-L264)
 * 
 * Implements:
 * - L260: Timeline Undo (History stack for UI state)
 */

interface HistoryEntry<T> {
    state: T;
    timestamp: number;
    label: string;
}

export function useTimelineUndo<T>(initialState: T, maxHistory: number = 50) {
    const [state, setState] = useState<T>(initialState);
    const history = useRef<HistoryEntry<T>[]>([
        { state: initialState, timestamp: Date.now(), label: "Initial" }
    ]);
    const historyIndex = useRef(0);

    const push = useCallback((newState: T, label: string = "Action") => {
        // Truncate future history if we've undone
        history.current = history.current.slice(0, historyIndex.current + 1);
        
        // Add new entry
        history.current.push({
            state: newState,
            timestamp: Date.now(),
            label,
        });

        // Limit history size
        if (history.current.length > maxHistory) {
            history.current = history.current.slice(-maxHistory);
        }

        historyIndex.current = history.current.length - 1;
        setState(newState);
    }, [maxHistory]);

    const undo = useCallback(() => {
        if (historyIndex.current > 0) {
            historyIndex.current--;
            setState(history.current[historyIndex.current].state);
            return true;
        }
        return false;
    }, []);

    const redo = useCallback(() => {
        if (historyIndex.current < history.current.length - 1) {
            historyIndex.current++;
            setState(history.current[historyIndex.current].state);
            return true;
        }
        return false;
    }, []);

    const canUndo = historyIndex.current > 0;
    const canRedo = historyIndex.current < history.current.length - 1;

    const getTimeline = useCallback(() => {
        return history.current.map((entry, i) => ({
            ...entry,
            isCurrent: i === historyIndex.current,
        }));
    }, []);

    const jumpTo = useCallback((index: number) => {
        if (index >= 0 && index < history.current.length) {
            historyIndex.current = index;
            setState(history.current[index].state);
        }
    }, []);

    return {
        state,
        push,
        undo,
        redo,
        canUndo,
        canRedo,
        getTimeline,
        jumpTo,
    };
}

/**
 * L261: Live Component Sandbox Controller
 * Allows runtime prop manipulation for development.
 */
export function useSandbox<T extends Record<string, unknown>>(defaultProps: T) {
    const [props, setProps] = useState<T>(defaultProps);
    const [isOpen, setIsOpen] = useState(false);

    const updateProp = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
        setProps(prev => ({ ...prev, [key]: value }));
    }, []);

    const reset = useCallback(() => {
        setProps(defaultProps);
    }, [defaultProps]);

    const toggle = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    return {
        props,
        updateProp,
        reset,
        isOpen,
        toggle,
    };
}
