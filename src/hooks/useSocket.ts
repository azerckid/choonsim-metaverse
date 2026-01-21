import { useEffect } from "react";
import { socket } from "@/lib/socket";
import { useGameStore } from "@/store/useGameStore";

export function useSocket() {
    const isStarted = useGameStore((state) => state.isStarted);
    const playerPosition = useGameStore((state) => state.playerPosition);

    const setOtherPlayers = useGameStore((state) => state.setOtherPlayers);
    const updateOtherPlayerPosition = useGameStore((state) => state.updateOtherPlayerPosition);
    const removeOtherPlayer = useGameStore((state) => state.removeOtherPlayer);

    // 1. 소켓 연결 및 초기화
    useEffect(() => {
        if (!isStarted) return;

        if (!socket.connected) {
            socket.connect();
        }

        // 서버 사이드에서 정의된 타입과 맞추기 위해 any 사용 또는 공통 타입 패키지 필요
        // 현재는 로컬 인터페이스에 의존
        const onInit = (data: { id: string; users: any }) => {
            console.log("Socket Initialized:", data);
            // 나 자신을 제외한 유저 목록 필터링 (필요 시)
            const others = { ...data.users };
            delete others[data.id];
            setOtherPlayers(others);
        };

        const onPlayerJoined = (user: any) => {
            console.log("Player Joined:", user);
            updateOtherPlayerPosition(user.id, user.position);
        };

        const onPlayerMoved = (data: { id: string; position: { x: number; y: number; z: number } }) => {
            updateOtherPlayerPosition(data.id, data.position);
        };

        const onPlayerLeft = (data: { id: string }) => {
            console.log("Player Left:", data.id);
            removeOtherPlayer(data.id);
        };

        socket.on("init", onInit);
        socket.on("playerJoined", onPlayerJoined);
        socket.on("playerMoved", onPlayerMoved);
        socket.on("playerLeft", onPlayerLeft);

        return () => {
            socket.off("init", onInit);
            socket.off("playerJoined", onPlayerJoined);
            socket.off("playerMoved", onPlayerMoved);
            socket.off("playerLeft", onPlayerLeft);
            // socket.disconnect(); // 컴포넌트 언마운트 시 연결을 끊을지는 기획에 따라 결정 (전역 유지가 유리)
        };
    }, [isStarted, setOtherPlayers, updateOtherPlayerPosition, removeOtherPlayer]);

    // 2. 내 위치 전송 (Throttling 고려 가능)
    useEffect(() => {
        if (!isStarted || !socket.connected) return;

        // 너무 잦은 전송을 막기 위해 0.05초(20fps) 단위로 끊는 것이 좋으나,
        // 일단은 위치가 변경될 때마다 전송 (React 상태 업데이트 주기에 의존)
        socket.emit("playerMove", { position: playerPosition });

    }, [playerPosition, isStarted]);
}
