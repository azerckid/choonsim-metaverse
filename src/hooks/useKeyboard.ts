import { useEffect } from "react";
import { useGameStore } from "@/store/useGameStore";

export const useKeyboard = () => {
    const { setKeyPressed, setDirectionOffset, directionOffset } = useGameStore();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const key = event.key.toLowerCase();
            useGameStore.setState((state) => ({
                keyPressed: { ...state.keyPressed, [key]: true }
            }));
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            const key = event.key.toLowerCase();
            useGameStore.setState((state) => ({
                keyPressed: { ...state.keyPressed, [key]: false }
            }));
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    // Compute direction offset based on pressed keys
    useEffect(() => {
        const unsubscribe = useGameStore.subscribe(
            (state) => state.keyPressed,
            (pressedKeys) => {
                let newOffset = directionOffset;
                const { w, a, s, d } = pressedKeys;

                if (w) {
                    if (a) {
                        newOffset = -Math.PI + Math.PI / 4; // w+a
                    } else if (d) {
                        newOffset = -Math.PI - Math.PI / 4; // w+d
                    } else {
                        newOffset = Math.PI; // w
                    }
                } else if (s) {
                    if (a) {
                        newOffset = -Math.PI / 4; // s+a
                    } else if (d) {
                        newOffset = Math.PI / 4; // s+d
                    } else {
                        newOffset = 0; // s
                    }
                } else if (a) {
                    newOffset = -Math.PI / 2; // a
                } else if (d) {
                    newOffset = Math.PI / 2; // d
                }

                if (newOffset !== directionOffset) {
                    setDirectionOffset(newOffset);
                }
            }
        );

        return () => unsubscribe();
    }, [directionOffset, setDirectionOffset]);
};
