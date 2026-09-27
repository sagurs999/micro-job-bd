let tg = window.Telegram.WebApp;
tg.expand(); 

// ব্যাক বাটন লজিক: হোম পেজ ছাড়া অন্য যেকোনো পেজে থাকলে ব্যাক বাটনে ক্লিক করলে হোমে আসবে
function updateBackButtonVisibility() {
    let activeTab = document.querySelector('.tab-pane.active').id;
    if (activeTab !== 'tab-home') {
        tg.BackButton.show();
    } else {
        tg.BackButton.hide();
    }
}

tg.BackButton.onClick(() => {
    let activeTab = document.querySelector('.tab-pane.active').id;
    if (activeTab !== 'tab-home') {
        switchTab('home'); 
    }
});

let user = tg.initDataUnsafe.user;
let currentUsername = "online earning";
let currentUserId = "5889828569";

if (user) {
    currentUsername = user.first_name;
    currentUserId = user.id;
}

document.getElementById("username").innerText = currentUsername;
document.getElementById("user-initial").innerText = currentUsername.charAt(0).toUpperCase();
document.getElementById("user-id").innerText = currentUserId;

document.getElementById("my-refer-link").value = `https://t.me/microjobbd80bot?start=ref_${currentUserId}`;

let allUsers = JSON.parse(localStorage.getItem('micro_job_all_users')) || {};

if (!allUsers[currentUserId]) {
    let initialBal = 225.00;
    let initialRef = 0;

    allUsers[currentUserId] = {
        name: currentUsername,
        id: currentUserId,
        balance: initialBal,
        referrals: initialRef,
        tasks: 0
    };
    localStorage.setItem('micro_job_all_users', JSON.stringify(allUsers));
}

let currentUserData = allUsers[currentUserId];
let balance = currentUserData.balance;
let referralCount = currentUserData.referrals;
let completedTasks = currentUserData.tasks;
const maxTasks = 15;

document.getElementById("balance").innerText = balance.toFixed(2);
document.getElementById("withdraw-balance").innerText = balance.toFixed(2) + " Tk";

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

function saveDataToStorage() {
    allUsers[currentUserId] = {
        name: currentUsername,
        id: currentUserId,
        balance: balance,
        referrals: referralCount,
        tasks: completedTasks
    };
    localStorage.setItem('micro_job_all_users', JSON.stringify(allUsers));
}

function submitWithdraw() {
    let balCheck = balance >= 400;
    let refCheck = referralCount >= 7;

    if (!balCheck || !refCheck) {
        alert("উইথড্র করতে হলে কমপক্ষে ৭টি রেফার এবং ৪০০ টাকা ব্যালেন্স থাকতে হবে!");
        return;
    }
    alert("উইথড্র রিকোয়েস্ট সফলভাবে জমা হয়েছে!");
}

function updateLeaderboardData() {
    saveDataToStorage();
    
    let userList = Object.values(allUsers);
    userList.sort((a, b) => b.tasks - a.tasks || b.balance - a.balance);

    let listHTML = "";
    userList.slice(0, 10).forEach((item, index) => {
        listHTML += `
            <div class="leaderboard-item">
                <span>#${index + 1} ${item.name}</span>
                <span>${item.balance.toFixed(2)} Tk (${item.tasks} Tasks)</span>
            </div>
        `;
    });
    document.getElementById("leaderboard-list").innerHTML = listHTML;
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

    updateBackButtonVisibility();
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

function openDirectAd(type) {
    // আপনার দেওয়া দুটি ডাইরেক্ট অ্যাড লিংক এখানে যুক্ত করা হলো
    if (type === 1) {
        window.open("https://www.profitableratecpmnetwork.com/fe5xzx71?key=8df7b21391b5943a775b558dc91e6fa9", "_blank");
    } else {
        window.open("https://www.profitableratecpmnetwork.com/m7xk7v5i?key=29f52e0125fd58eab0283bb2649246b8", "_blank");
    }
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

const liveNames = [currentUsername, "Riyad Vai", "Sakib Khan"];
function updateLiveTicker() {
    let randomName = liveNames[Math.floor(Math.random() * liveNames.length)];
    let randomAmount = (Math.random() * (1500 - 400) + 400).toFixed(2);
    
    document.getElementById("live-user").innerText = randomName;
    document.getElementById("live-amount").innerText = randomAmount + " ৳";
}

setInterval(updateLiveTicker, 5000);
updateBackButtonVisibility();
