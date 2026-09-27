let tg = window.Telegram.WebApp;
tg.expand(); 

let user = tg.initDataUnsafe.user;
let currentUsername = "MD SAKIB";
let currentUserId = "8596514126";

if (user) {
    currentUsername = user.first_name;
    currentUserId = user.id;
    document.getElementById("username").innerText = currentUsername;
    document.getElementById("user-initial").innerText = currentUsername.charAt(0).toUpperCase();
    document.getElementById("user-id").innerText = currentUserId;
}

let balance = 225.00;
let referralCount = 2; 
let completedTasks = 0;
const maxTasks = 15;

function checkWithdrawUnlock() {
    document.getElementById("curr-bal-val").innerText = balance.toFixed(2);
    document.getElementById("curr-ref-val").innerText = referralCount;
    document.getElementById("total-refer-count").innerText = referralCount + " জন";

    let balCheck = balance >= 400;
    let refCheck = referralCount >= 7;

    let balCondElem = document.getElementById("cond-balance");
    let refCondElem = document.getElementById("cond-refer");

    if (balCheck) {
        balCondElem.innerHTML = "✅ ব্যালেন্স কমপক্ষে ৪০০ টাকা হয়েছে";
        balCondElem.style.color = "#16a34a";
    } else {
        balCondElem.innerHTML = `❌ ব্যালেন্স কমপক্ষে ৪০০ টাকা হতে হবে (বর্তমান: ${balance.toFixed(2)} Tk)`;
        balCondElem.style.color = "#dc2626";
    }

    if (refCheck) {
        refCondElem.innerHTML = "✅ কমপক্ষে ৭টি রেফার সম্পন্ন হয়েছে";
        refCondElem.style.color = "#16a34a";
    } else {
        refCondElem.innerHTML = `❌ কমপক্ষে ৭টি রেফার করতে হবে (বর্তমান: ${referralCount}/7)`;
        refCondElem.style.color = "#dc2626";
    }
}

checkWithdrawUnlock();

function submitWithdraw() {
    let balCheck = balance >= 400;
    let refCheck = referralCount >= 7;

    if (!balCheck || !refCheck) {
        alert("উইথড্র করতে হলে কমপক্ষে ৭টি রেফার এবং ৪০০ টাকা ব্যালেন্স থাকতে হবে!");
        return;
    }
    alert("উইথড্র রিকোয়েস্ট সফলভাবে জমা হয়েছে!");
}

let leaderboardData = JSON.parse(localStorage.getItem('micro_job_leaderboard')) || [
    { name: "Micro Job BD", balance: 1000.00, tasks: 50 },
    { name: "Arafat Islam", balance: 77.33, tasks: 5 },
    { name: currentUsername, balance: balance, tasks: completedTasks }
];

function updateLeaderboardData() {
    let existingUser = leaderboardData.find(u => u.name === currentUsername);
    if (existingUser) {
        existingUser.balance = balance;
        existingUser.tasks = completedTasks;
    } else {
        leaderboardData.push({ name: currentUsername, balance: balance, tasks: completedTasks });
    }

    leaderboardData.sort((a, b) => b.tasks - a.tasks || b.balance - a.balance);

    let listHTML = "";
    leaderboardData.slice(0, 10).forEach((item, index) => {
        listHTML += `
            <div class="leaderboard-item">
                <span>#${index + 1} ${item.name}</span>
                <span>${item.balance.toFixed(2)} Tk (${item.tasks} Tasks)</span>
            </div>
        `;
    });
    document.getElementById("leaderboard-list").innerHTML = listHTML;
    localStorage.setItem('micro_job_leaderboard', JSON.stringify(leaderboardData));
}

updateLeaderboardData();

function switchTab(tabId) {
    document.querySelectorAll('.tab-pane').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById('tab-' + tabId).classList.add('active');

    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    if(tabId === 'home') document.querySelectorAll('.nav-item')[0].classList.add('active');
    if(tabId === 'tasks') document.querySelectorAll('.nav-item')[1].classList.add('active');
    if(tabId === 'top') {
        document.querySelectorAll('.nav-item')[2].classList.add('active');
        updateLeaderboardData();
    }
    if(tabId === 'withdraw') {
        document.querySelectorAll('.nav-item')[3].classList.add('active');
        checkWithdrawUnlock();
    }
}

let countdownInterval;
let timeLeft = 20;

function startTaskTimer() {
    timeLeft = 20;
    document.getElementById("timer-countdown").innerText = timeLeft;
    document.getElementById("task-modal").style.display = "flex";

    countdownInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer-countdown").innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            document.getElementById("task-modal").style.display = "none";
            completeTask();
        }
    }, 1000);
}

function openDirectAd() {
    alert("অ্যাড পেজে রিডাইরেক্ট করা হচ্ছে। ২০ সেকেন্ড অপেক্ষা করুন!");
}

function cancelTask() {
    clearInterval(countdownInterval);
    document.getElementById("task-modal").style.display = "none";
    alert("সতর্কতা: ২০ সেকেন্ড পূর্ণ হওয়ার আগেই বের হয়ে যাওয়ায় কাজটি বাতিল করা হয়েছে!");
}

function completeTask() {
    if (completedTasks < maxTasks) {
        completedTasks++;
        balance += 15.00; 
        
        document.getElementById("balance").innerText = balance.toFixed(2);
        document.getElementById("withdraw-balance").innerText = balance.toFixed(2) + " Tk";
        document.getElementById("task-count").innerText = `${completedTasks} / ${maxTasks}`;
        
        let percentage = (completedTasks / maxTasks) * 100;
        document.getElementById("progress-fill").style.width = percentage + "%";
        
        checkWithdrawUnlock();
        updateLeaderboardData();
        alert("অভিনন্দন! সফলভাবে টাস্ক সম্পন্ন হয়েছে এবং অ্যাকাউন্টে ১৫ টাকা যোগ হয়েছে।");
        switchTab('home');
    } else {
        alert("আজকের সব টাস্ক সম্পন্ন হয়েছে!");
    }
}

function openProfileModal() {
    document.getElementById("modal-username").innerText = currentUsername;
    document.getElementById("modal-userid").innerText = currentUserId;
    document.getElementById("modal-balance").innerText = balance.toFixed(2);
    document.getElementById("modal-refer").innerText = referralCount;
    document.getElementById("modal-tasks").innerText = completedTasks;
    document.getElementById("profile-modal").style.display = "flex";
}

function closeProfileModal() {
    document.getElementById("profile-modal").style.display = "none";
}

function selectMethod(btn, method) {
    document.querySelectorAll('.method-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    let cryptoContainer = document.getElementById('crypto-select-container');
    let accountLabel = document.getElementById('account-label');
    let accountInput = document.getElementById('account-input');

    if (method === 'binance') {
        cryptoContainer.style.display = 'block';
        accountLabel.innerText = "বাইন্যান্স ওয়ালেট অ্যাড্রেস / Pay ID";
        accountInput.placeholder = "Enter Wallet Address or Pay ID";
    } else {
        cryptoContainer.style.display = 'none';
        accountLabel.innerText = "অ্যাকাউন্ট নম্বর (পার্সোনাল)";
        accountInput.placeholder = "01XXX-XXXXXX";
    }
}

const liveNames = ["Riyad Vai", "Sakib Khan", "Tanvir Ahmed", "Rakibul Islam", "Mehedi Hasan", "Nayeem Hossain", "Arman Ali"];
function updateLiveTicker() {
    let randomName = liveNames[Math.floor(Math.random() * liveNames.length)];
    let randomAmount = (Math.random() * (1500 - 400) + 400).toFixed(2);
    
    document.getElementById("live-user").innerText = randomName;
    document.getElementById("live-amount").innerText = randomAmount + " ৳";
}

setInterval(updateLiveTicker, 5000);
