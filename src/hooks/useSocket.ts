import { useEffect, useRef } from "react";
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

        // 가이드: currentUsers 이벤트 (접속 시 현재 맵에 있는 유저 정보 수신)
        const onCurrentUsers = (data: { id: string; users: any }) => {
            console.log("Socket Initialized - Received Users:", data);

            // 나 자신을 제외한 유저 목록 필터링
            // 서버에서 보내준 내 ID(data.id)를 기준으로 필터링해야 정확함
            const myServerId = data.id || socket.id;

            const others = { ...data.users };
            if (myServerId && others[myServerId]) {
                delete others[myServerId];
            }

            setOtherPlayers(others);
        };

        // 가이드: newPlayer 이벤트 (새로운 유저 입장)
        const onNewPlayer = (user: any) => {
            console.log("Player Joined (newPlayer):", user);
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
        socket.on("currentUsers", onCurrentUsers);
        socket.on("newPlayer", onNewPlayer);
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
            socket.off("currentUsers", onCurrentUsers);
            socket.off("newPlayer", onNewPlayer);
            socket.off("playerMoved", onPlayerMoved);
            socket.off("playerLeft", onPlayerLeft);
        };
    }, [isStarted, setOtherPlayers, updateOtherPlayerPosition, removeOtherPlayer, playerPosition]);

    // 2. 내 위치 전송 (Throttling 적용: 50ms)
    const lastEmitTime = useRef<number>(0);

    useEffect(() => {
        if (!isStarted || !socket.connected) return;

        const now = Date.now();
        // 50ms (초당 20회) 제한으로 네트워크 부하 감소
        if (now - lastEmitTime.current > 50) {
            // 가이드: updatePosition 이벤트
            socket.emit("updatePosition", { position: playerPosition });
            lastEmitTime.current = now;
        }

    }, [playerPosition, isStarted]);
}
