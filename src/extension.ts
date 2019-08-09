
import * as vscode from 'vscode';
// const Done = '★';
// const Undone = '☆';
const Done = `$(primitive-square)`;
const Undone = `$(dash)`;
const Count = 20;

const days_1 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const days_2 = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "timefly" is now active!');

	// TODO:准确一点，这里要建立一个定时任务，每天的0点更新。

	//☆★◇◆□■△▲○●

	let now = new Date();
	let passed = getPassedDayCount(now);
	let all = getDayCount(now.getFullYear());
	let percent = passed / all;
	let passedCount = Math.floor(percent * Count);
	// let passedCount = 18;
	let leftCount = Count - passedCount;
	console.log(`比例:${passedCount},${leftCount}`);
	let str1 = new Array(passedCount).fill(Done).join('');
	let str2 = new Array(leftCount).fill(Undone).join('');
	let str = str1 + str2;

	let statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	statusBarItem.text = str;
	statusBarItem.tooltip = `今年已经过去了${passed}天`;
	statusBarItem.show();
	context.subscriptions.push(statusBarItem);
}

// this method is called when your extension is deactivated
export function deactivate() { }


/**
 * 是否闰年，能被4整除但不能被100整除或者能被400整除
 * @param year 当前的年份
 */
function checkLeapYear(year: number) {
	return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * 获取今年总的天数
 * @param year 
 */
function getDayCount(year: number) {
	let isLeapYear = checkLeapYear(year);
	return isLeapYear ? 366 : 365;
}

/**
 * 今年过去了多少天
 * @param now 
 */
function getPassedDayCount(now: Date) {
	let year = now.getFullYear();
	let month = now.getMonth(); // 0 ~ 11
	let day = now.getDate();// 1 ~ 31
	let isLeapYear = checkLeapYear(year);
	let days = isLeapYear ? days_2 : days_1;
	let passed = 0;
	for (let i = 0; i < month; i++) {
		passed += days[i];
	}
	passed += (day - 1); //减去1天，因为今天才刚开始，还没过去呢
	return passed;
}