import { createContext } from 'svelte';

import type { LocalizedText } from '@/types/common/locale';

export type GroupCustomContext = {
	updateButtonText: (id: string, key: keyof LocalizedText, txt: string) => void;
	updateButtonIcon: (id: string, iconUrl: string) => void;
};

export const [getGroupCustomContext, setGroupCustomContext] = createContext<GroupCustomContext>();
