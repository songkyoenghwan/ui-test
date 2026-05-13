// server.js
import { handler } from './build/handler.js';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: '*', // 배포 환경에 따라 도메인을 제한하세요
		methods: ['GET', 'POST'],
	},
});

// ✅ 올바른 연결 구조
io.on('connection', (socket) => {
	console.log('⚡ 유저 연결 성공:', socket.id);

	// ❌ socket.on('connection', ...) 은 필요 없습니다.
	// 이미 이 안으로 들어왔다면 연결된 상태입니다.

	// 박스 정보 수신 및 브로드캐스트
	socket.on('box', (data) => {
		console.log('📦 Box 데이터 수신:', data);
		io.emit('box', data);
	});

	// 스캔 상태 수신 및 브로드캐스트
	socket.on('scan', (data) => {
		console.log('🎯 Scan 데이터 수신:', data);
		io.emit('scan', data);
	});

	socket.on('disconnect', () => {
		console.log('🔌 유저 연결 해제:', socket.id);
	});
});

// SvelteKit 핸들러를 마지막에 등록 (API나 정적 파일 처리를 위해)
app.use(handler);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
	console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
