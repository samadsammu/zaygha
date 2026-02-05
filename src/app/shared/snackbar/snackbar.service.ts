import { Injectable, signal } from '@angular/core';

export interface SnackbarData {
    message: string;
    actionText?: string;
    actionCallback?: () => void;
    duration?: number;
}

@Injectable({
    providedIn: 'root'
})
export class SnackbarService {
    data = signal<SnackbarData | null>(null);
    isVisible = signal(false);
    private timeoutId: any;

    show(message: string, actionText?: string, actionCallback?: () => void, duration: number = 3000) {
        this.data.set({ message, actionText, actionCallback });
        this.isVisible.set(true);

        if (this.timeoutId) clearTimeout(this.timeoutId);

        this.timeoutId = setTimeout(() => {
            this.close();
        }, duration);
    }

    close() {
        this.isVisible.set(false);
    }

    triggerAction() {
        const currentData = this.data();
        if (currentData?.actionCallback) {
            currentData.actionCallback();
        }
        this.close();
    }
}
