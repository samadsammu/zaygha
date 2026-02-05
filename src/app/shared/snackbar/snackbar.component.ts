import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarService } from './snackbar.service';

@Component({
    selector: 'app-snackbar',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="snackbar" [class.show]="snackbarService.isVisible()">
      <span class="message">{{ snackbarService.data()?.message }}</span>
      <button 
        *ngIf="snackbarService.data()?.actionText" 
        (click)="snackbarService.triggerAction()" 
        class="action-btn">
        {{ snackbarService.data()?.actionText }}
      </button>
      <button class="close-btn" (click)="snackbarService.close()">×</button>
    </div>
  `,
    styles: [`
    .snackbar {
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: rgba(15, 15, 15, 0.95);
      color: #fff;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 1.5rem;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      border: 1px solid var(--dark-gold, #b8962e);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 9999;
      min-width: 300px;
      justify-content: space-between;
      backdrop-filter: blur(10px);
    }

    .snackbar.show {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }

    .message {
      font-size: 0.95rem;
      font-family: 'Poppins', sans-serif;
    }

    .action-btn {
      background: transparent;
      border: 1px solid var(--primary-gold, #d4af37);
      color: var(--primary-gold, #d4af37);
      padding: 0.4rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 0.8rem;
      transition: 0.2s;
    }

    .action-btn:hover {
      background: var(--primary-gold, #d4af37);
      color: #000;
    }

    .close-btn {
      background: transparent;
      border: none;
      color: #888;
      font-size: 1.5rem;
      cursor: pointer;
      line-height: 1;
      padding: 0;
    }

    .close-btn:hover {
      color: #fff;
    }

    @media (max-width: 768px) {
      .snackbar {
        width: 90%;
        bottom: 1rem;
      }
    }
  `]
})
export class SnackbarComponent {
    constructor(public snackbarService: SnackbarService) { }
}
