* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    background-color: #f0f4f8;
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.app-container {
    width: 100%;
    max-width: 480px;
    height: 100vh;
    background: #2563eb;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    box-shadow: 0 0 15px rgba(0,0,0,0.1);
}

.header {
    background: #2563eb;
    color: white;
    padding: 12px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 18px;
    font-weight: bold;
}

.min-withdraw-badge {
    background: rgba(255, 255, 255, 0.2);
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 11px;
}

.profile-card {
    background: white;
    margin: 0 12px 12px 12px;
    padding: 15px;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.user-info {
    display: flex;
    align-items: center;
    gap: 12px;
}

.avatar {
    width: 45px;
    height: 45px;
    background: #2563eb;
    color: white;
    font-weight: bold;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
}

.balance-box {
    background: #2563eb;
    color: white;
    padding: 8px 14px;
    border-radius: 8px;
    font-weight: bold;
    font-size: 15px;
}

.content-area {
    flex: 1;
    background: #f8fafc;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    overflow-y: auto;
    padding: 15px;
}

.tab-pane {
    display: none;
}

.tab-pane.active {
    display: block;
}

.section-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 12px;
    color: #1e293b;
}

.grid-menu {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-bottom: 15px;
}

.menu-card {
    background: white;
    border: 1px solid #e2e8f0;
    padding: 15px 10px;
    border-radius: 12px;
    text-align: center;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.menu-card i {
    font-size: 20px;
    margin-bottom: 6px;
}

.menu-card span {
    display: block;
    font-size: 11px;
    font-weight: 600;
    color: #475569;
}

.progress-box, .card-box {
    background: white;
    padding: 15px;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    margin-bottom: 15px;
}

.progress-title {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 8px;
}

.progress-bar-bg {
    width: 100%;
    height: 8px;
    background: #e2e8f0;
    border-radius: 4px;
    overflow: hidden;
}

.progress-bar-fill {
    height: 100%;
    background: #2563eb;
    width: 0%;
}

.primary-btn {
    width: 100%;
    background: #2563eb;
    color: white;
    border: none;
    padding: 12px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 10px;
}

.methods {
    display: flex;
    gap: 10px;
    margin: 10px 0;
}

.method-btn {
    flex: 1;
    padding: 10px;
    border: 1px solid #cbd5e0;
    background: white;
    border-radius: 6px;
    cursor: pointer;
}

.method-btn.active {
    border-color: #2563eb;
    background: #eff6ff;
}

.withdraw-form label {
    font-size: 12px;
    font-weight: 600;
    display: block;
    margin-top: 10px;
}

.withdraw-form input {
    width: 100%;
    padding: 10px;
    border: 1px solid #cbd5e0;
    border-radius: 6px;
    margin-top: 5px;
    outline: none;
}

.locked-btn, .locked-btn-action {
    width: 100%;
    background: #cbd5e0;
    color: #475569;
    border: none;
    padding: 12px;
    border-radius: 8px;
    font-weight: bold;
    margin-top: 15px;
    cursor: not-allowed;
}

.leaderboard-item {
    display: flex;
    justify-content: space-between;
    background: white;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 8px;
    font-weight: 600;
    border: 1px solid #e2e8f0;
}

.bottom-nav {
    display: flex;
    justify-content: space-around;
    background: white;
    border-top: 1px solid #e2e8f0;
    padding: 8px 0;
}

.nav-item {
    text-align: center;
    cursor: pointer;
    color: #64748b;
    flex: 1;
}

.nav-item.active {
    color: #2563eb;
}

.nav-item i {
    font-size: 16px;
    display: block;
    margin-bottom: 2px;
}

.nav-item span {
    font-size: 10px;
}

.video-container {
    background: #000;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 12px;
}
