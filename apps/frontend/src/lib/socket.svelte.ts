// src/lib/socket.svelte.ts

import { Socket, io } from 'socket.io-client';

import { browser } from '$app/environment';

const socketUrl = import.meta.env.DEV ? 'http://localhost:5173' : 'http://localhost:3000';

class SocketManager {
	instance = $state<Socket | null>(null);
	isConnected = $state(false);

	constructor() {
		if (browser) {
			this.init();
		}
	}

	private init() {
		this.instance = io(socketUrl, {
			transports: ['websocket'],
			autoConnect: true,
		});

		this.instance.on('connect', () => {
			this.isConnected = true;
		});

		this.instance.on('disconnect', () => {
			this.isConnected = false;
		});
	}

	// oxlint-disable-next-line typescript/no-explicit-any
	emit(event: string, data: any) {
		this.instance?.emit(event, data);
	}
}

export const socketManager = new SocketManager();
