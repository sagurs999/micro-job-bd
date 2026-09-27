let tg = window.Telegram.WebApp;
tg.expand(); 

let user = tg.initDataUnsafe.user;
if (user) {
    document.getElementById("username").innerText = user.first_name;
    document.getElementById("user-initial").innerText = user.first_name.charAt(0).toUpperCase();
    document.getElementById("user-id").innerText = user.id;
}

let balance = 225.00;
let completedTasks = 0;
const maxTasks = 15;

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById('tab-' + tabId).classList.add('active');

    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
}

function completeTask() {
    if (completedTasks < maxTasks) {
        completedTasks++;
        balance += 15.00; 
        
        document.getElementById("balance").innerText = balance.toFixed(2);
        document.getElementById("task-count").innerText = `${completedTasks} / ${maxTasks}`;
        
        let percentage = (completedTasks / maxTasks) * 100;
        document.getElementById("progress-fill").style.width = percentage + "%";
        
        alert("সফলভাবে টাস্ক সম্পন্ন হয়েছে! আপনার অ্যাকাউন্টে ১৫.০০ টাকা যোগ করা হয়েছে।");
        switchTab('home');
    } else {
        alert("আজকের সব টাস্ক সম্পন্ন হয়েছে!");
    }
}

// ভিডিও দেখার লজিক
const videoElement = document.getElementById('task-video');
const claimBtn = document.getElementById('claim-reward-btn');

if (videoElement) {
    videoElement.addEventListener('ended', function() {
        claimBtn.disabled = false;
        claimBtn.style.background = "#2481cc";
        claimBtn.style.cursor = "pointer";
        alert("ভিডিও দেখা শেষ! এখন বোনাস সংগ্রহ করুন।");
    });
}

function claimVideoReward() {
    balance += 15.00; 
    document.getElementById("balance").innerText = balance.toFixed(2);
    alert("সফলভাবে আপনার অ্যাকাউন্টে ১৫.০০ টাকা যোগ করা হয়েছে!");
    
    switchTab('home');
    
    claimBtn.disabled = true;
    claimBtn.style.background = "#cbd5e0";
    claimBtn.style.cursor = "not-allowed";
}
