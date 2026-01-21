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

        console.log("Attempting to connect to socket server...");

        const onConnect = () => {
            console.log("Socket Connected! ID:", socket.id);
        };

        const onConnectError = (error: any) => {
            console.error("Socket Connection Error:", error);
        };

        // 서버 사이드에서 정의된 타입과 맞추기 위해 any 사용 또는 공통 타입 패키지 필요
        const onInit = (data: { id: string; users: any }) => {
            console.log("Socket Initialized - Received Users:", data);
            // 나 자신을 제외한 유저 목록 필터링
            const others = { ...data.users };
            if (data.id) delete others[data.id]; // socket.id가 아직 설정 안되었을 경우 대비
            setOtherPlayers(others);
        };

        const onPlayerJoined = (user: any) => {
            console.log("Player Joined Event:", user);
            // user 객체에는 id, position, nickname이 포함됨
            updateOtherPlayerPosition(user.id, user.position, user.action, user.nickname);
        };

        const onPlayerMoved = (data: { id: string; position: { x: number; y: number; z: number } }) => {
            // console.log("Player Moved:", data); // 너무 잦은 로그 방지
            updateOtherPlayerPosition(data.id, data.position);
        };

        const onPlayerLeft = (data: { id: string }) => {
            console.log("Player Left Event:", data.id);
            removeOtherPlayer(data.id);
        };

        // 리스너 등록
        socket.on("connect", onConnect);
        socket.on("connect_error", onConnectError);
        socket.on("init", onInit);
        socket.on("playerJoined", onPlayerJoined);
        socket.on("playerMoved", onPlayerMoved);
        socket.on("playerLeft", onPlayerLeft);

        // 연결 시도 (리스너 등록 후)
        if (!socket.connected) {
            socket.io.opts.autoConnect = true; // 수동 연결에서 자동 연결로 변경해도 됨
            socket.connect();
        }

        return () => {
            console.log("Cleaning up socket listeners...");
            socket.off("connect", onConnect);
            socket.off("connect_error", onConnectError);
            socket.off("init", onInit);
            socket.off("playerJoined", onPlayerJoined);
            socket.off("playerMoved", onPlayerMoved);
            socket.off("playerLeft", onPlayerLeft);
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
