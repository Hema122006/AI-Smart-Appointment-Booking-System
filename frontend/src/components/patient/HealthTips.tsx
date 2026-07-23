function HealthTips() {

const tips=[

"💧 Drink 2-3 liters of water daily.",

"🚶 Walk at least 30 minutes every day.",

"🥗 Eat more vegetables and fruits.",

"😴 Sleep for 7-8 hours.",

"🧘 Reduce stress through meditation."

];

const randomTip=tips[Math.floor(Math.random()*tips.length)];

return(

<div
style={{
background:"#FFF8E1",
padding:20,
borderRadius:12,
marginTop:30
}}
>

<h3>🤖 AI Health Tip</h3>

<p>{randomTip}</p>

</div>

);

}

export default HealthTips;