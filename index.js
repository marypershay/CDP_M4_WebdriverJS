const assert = require('assert');
require('chromedriver');

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var browser = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

var until = webdriver.until;


browser.get('https://www.onliner.by');

browser.findElement(By.css("input.fast-search__input"))
		.sendKeys("A")
		.then(function(){
	 		return browser.switchTo().frame(browser.findElement(By.css("iframe.modal-iframe")));
	 	})
	 	.then(function(){
	 		var query = browser.wait(until.elementLocated(By.css(".search__input")));
 			return query.sendKeys('pple iPhone 6s 16GB Silver');
	 	})
	 	.then(function(){
			browser.wait(until.elementLocated(By.css("a[href$='iphone6s16gbs']")));
			return browser.findElement(By.css("a[href$='iphone6s16gbs']"));
		})
		.then(function(link){
			return link.click();
		})
		.then(function(){
			browser.wait(until.titleIs('Купить iPhone 6s'));
		});

browser.findElement(By.css('tbody:nth-child(3) > tr:last-child > td:last-child > span'))
		.getText()
		.then(function(matrix){
			assert.equal(matrix, "12 Мп", "-Test: Количество точек матрицы должно быть 12 Мп");
		})
		.then(function(){
			console.log("+Test: Количество точек матрицы 12 Мп");}
			,function (err) {
    			console.error(err.message);
    	});

browser.findElement(webdriver.By.css('tbody:nth-child(4) > tr:nth-child(2) > td:last-child > span'))
		.getText()
		.then(function(prossesor){
			assert.equal(prossesor, "Apple A9","-Test: Процессор должен быть Apple A9");
		})
		.then(function(){
			console.log("+Test: Процессор Apple A9");}
			,function (err) {
    			console.error(err.message);
    	});

browser.findElement(webdriver.By.css('tbody:nth-child(5) > tr:nth-child(12) > td:last-child > span'))
		.getAttribute('class')
		.then(function(fingerPrint){
			assert.equal(fingerPrint, "i-tip","-Test: Сканер отпечатка пальца должен быть");
		})
		.then(function(){
			console.log("+Test: Сканер отпечатка пальца есть");}
			,function (err) {
    			console.error(err.message);
    	});

browser.findElement(By.css('tbody:nth-child(6) > tr:nth-child(2) > td:last-child > span'))
		.getText()
		.then(function(length){
			assert.equal(length, "138.3 мм", "+Test: Длина не равна 138.3 мм");
		})
		.then(function(){
			console.log("+Test: Длина 138.3 мм");}
			,function (err) {
    			console.error(err.message);
    	});

browser.findElement(webdriver.By.css('tbody:nth-last-child(6) > tr:nth-child(3) > td:last-child > span'))
		.getAttribute('class')
		.then(function(fmModule){
			assert.equal(fmModule, "i-x","-Test: FM-приёмника не должно быть");
		})
		.then(function(){
			console.log("+Test: FM-приёмника нет");}
			,function (err) {
    			console.error(err.message);
    	});

browser.quit();