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
    document.querySelectorAll('.tab-pane').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById('tab-' + tabId).classList.add('active');

    // নিচের মেনুবারের অ্যাক্টিভ স্ট্যাটাস আপডেট
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    if(tabId === 'home') document.querySelectorAll('.nav-item')[0].classList.add('active');
    if(tabId === 'tasks') document.querySelectorAll('.nav-item')[1].classList.add('active');
    if(tabId === 'top') document.querySelectorAll('.nav-item')[2].classList.add('active');
    if(tabId === 'withdraw') document.querySelectorAll('.nav-item')[3].classList.add('active');
}

function completeTask() {
    if (completedTasks < maxTasks) {
        completedTasks++;
        balance += 15.00; 
        
        document.getElementById("balance").innerText = balance.toFixed(2);
        document.getElementById("task-count").innerText = `${completedTasks} / ${maxTasks}`;
        
        let percentage = (completedTasks / maxTasks) * 100;
        document.getElementById("progress-fill").style.width = percentage + "%";
        
        alert("সফলভাবে টাস্ক সম্পন্ন হয়েছে!");
        switchTab('home');
    } else {
        alert("আজকের সব টাস্ক সম্পন্ন হয়েছে!");
    }
}

// ভিডিও দেখার পর রিওয়ার্ড এনাবল হওয়ার লজিক
const videoElement = document.getElementById('task-video');
const claimBtn = document.getElementById('claim-reward-btn');

if (videoElement) {
    videoElement.addEventListener('ended', function() {
        claimBtn.disabled = false;
        claimBtn.classList.remove('locked-btn');
        claimBtn.style.background = "#2563eb";
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
    claimBtn.classList.add('locked-btn');
    claimBtn.style.background = "#cbd5e0";
}

function selectMethod(btn) {
    document.querySelectorAll('.method-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}
