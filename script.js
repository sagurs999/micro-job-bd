let tg = window.Telegram.WebApp;
tg.expand(); 

// টেলিগ্রাম থেকে ইউজারের নাম এবং আইডি অটো শো করা
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

    // মেনুবারের অ্যাক্টিভ ক্লাস আপডেট
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

// পেমেন্ট মেথড সিলেক্ট করার সময় বাইন্যান্স ক্রিপ্টো লিস্ট এবং ইনপুট ফিল্ড পরিবর্তনের লজিক
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

// লাইভ উইথড্র টিকার (রেন্ডম ইউজার এবং ৪০০ টাকার উপরে রেন্ডম অ্যামাউন্ট)
const liveNames = ["Riyad Vai", "Sakib Khan", "Tanvir Ahmed", "Rakibul Islam", "Mehedi Hasan", "Nayeem Hossain", "Arman Ali"];
function updateLiveTicker() {
    let randomName = liveNames[Math.floor(Math.random() * liveNames.length)];
    let randomAmount = (Math.random() * (1500 - 400) + 400).toFixed(2); // ৪০০ থেকে ১৫০০ টাকার মধ্যে রেন্ডম এমাউন্ট
    
    document.getElementById("live-user").innerText = randomName;
    document.getElementById("live-amount").innerText = randomAmount + " ৳";
}

// প্রতি ৫ সেকেন্ড পর পর লাইভ উইথড্র নাম ও এমাউন্ট পরিবর্তন হবে
setInterval(updateLiveTicker, 5000);
