import { Component } from '@angular/core';

@Component({
    selector: 'app-launching-soon',
    standalone: true,
    template: `
    <div class="coming-soon-container">
        <div class="content-box">
            <h1>Launching Soon</h1>
            <p>We are crafting something exquisite for you.</p>
            <div class="divider"></div>
            <a href="/" class="back-home">Return to Home</a>
        </div>
    </div>
  `,
    styles: [`
    .coming-soon-container {
        height: 80vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--page-bg);
        color: var(--text-light);
        text-align: center;
    }
    .content-box {
        border: 1px solid var(--dark-gold);
        padding: 4rem;
        background: rgba(20, 20, 20, 0.5);
    }
    h1 {
        font-size: 3rem;
        color: var(--primary-gold);
        margin-bottom: 1rem;
    }
    p {
        font-size: 1.2rem;
        letter-spacing: 2px;
        color: #ccc;
    }
    .divider {
        width: 50px;
        height: 2px;
        background: var(--dark-gold);
        margin: 2rem auto;
    }
    .back-home {
        color: var(--text-light);
        text-decoration: underline;
        font-size: 0.9rem;
        letter-spacing: 1px;
    }
  `]
})
export class LaunchingSoonComponent { }
