import { expect } from 'chai';
import { Builder, By, until, WebDriver,Capabilities } from 'selenium-webdriver';

describe('HomepageView', () => {
  let driver: WebDriver;
  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://localhost:8080/');
  });

  afterEach(async () => {
    await driver.manage().deleteAllCookies();
  });

  after(async () => {
    await driver.quit();
  });

  it('should render buttons with correct labels', async () => {
    const buttons = await driver.wait(until.elementsLocated(By.tagName('vaadin-button')), 5000);
    expect(buttons.length).to.equal(4);

    const buttonTexts = await Promise.all(buttons.map(async button => await button.getText()));
    expect(buttonTexts).to.deep.equal([
      'Events',
      'Human Resources History',
      'Training History',
      'Financial Report',
    ]);
  });

  // Add more test cases for different scenarios, like checking if buttons navigate to correct pages
//   it('should navigate to correct pages when buttons are clicked', async function () {
//     this.timeout(10000);
//     const urls = [
//       'http://localhost:8080/Events',
//       'http://localhost:8080/HrHistory',
//       'http://localhost:8080/TrainingHistory',
//       'http://localhost:8080/FinancialReport',
//     ];
//
//     for (let i = 0; i < urls.length; i++) {
//       const buttons = await driver.wait(until.elementsLocated(By.tagName('vaadin-button')), 5000);
//       await buttons[i].click();
//       await driver.wait(until.urlIs(urls[i]), 5000);
//       expect(await driver.getCurrentUrl()).to.equal(urls[i]);
//       await driver.navigate().back();
//       await driver.wait(until.urlIs('http://localhost:8080/'), 5000);
//     }
//   });
});

describe('EventsView', () => {
  let driver: WebDriver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://localhost:8080/Events'); // Make sure your app is running at this URL
  });

  after(async () => {
    await driver.quit();
  });

  it('should display the EventsView component', async () => {
    const eventsView = await driver.findElement(By.tagName('events-view'));
    expect(eventsView).to.exist;
  });

  it('should have a "New Event" button', async () => {
    const newEventButton = await driver.findElement(By.id('newEventBtn'));
    expect(await newEventButton.getText()).to.equal('Create Event');
  });

  it('should have an "Edit Event" button', async () => {
    const editEventButton = await driver.findElement(By.id('editEventBtn'));
    expect(await editEventButton.getText()).to.equal('Edit Event');
  });
  
  it('should have a "Delete Event" button', async () => {
    const deleteEventButton = await driver.findElement(By.id('deleteEventBtn'));
    expect(await deleteEventButton.getText()).to.equal('Delete Event');
  });
  
  it('should have a "Back" button', async () => {
    const backButton = await driver.findElement(By.xpath('//vaadin-button[contains(text(),"Back")]'));
    expect(backButton).to.exist;
  });
  
  it('should display a notification when clicking "Edit Event" button without a selected row', async () => {
    const editEventButton = await driver.findElement(By.id('editEventBtn'));
    await editEventButton.click();
    const notification = await driver.wait(until.elementLocated(By.tagName('vaadin-notification-card')), 5000);
    expect(notification).to.exist;
  });
  
  it('should display a confirmation dialog when clicking "Delete Event" button with a selected row', async () => {
    // Select the first row in the table
    const firstRow = await driver.findElement(By.css('vaadin-grid-cell-content'));
    await firstRow.click();
  
    // Click the "Delete Event" button
    const deleteEventButton = await driver.findElement(By.id('deleteEventBtn'));
    await deleteEventButton.click();
  
    // Check for the presence of a confirmation dialog
    const confirmDialog = await driver.findElement(By.tagName('vaadin-confirm-dialog'));
    expect(confirmDialog).to.exist;
  });

});

describe('FinancialReportView', () => {
  let driver: WebDriver;
  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://localhost:8080/FinancialReport');
  });

  afterEach(async () => {
    await driver.manage().deleteAllCookies();
  });

  after(async () => {
    await driver.quit();
  });

  it('should render the grid and buttons', async () => {
    const grid = await driver.wait(until.elementLocated(By.tagName('vaadin-grid')), 5000);
    expect(grid).to.exist;

    const viewButton = await driver.findElement(By.css('vaadin-button:first-child'));
    expect(viewButton).to.exist;
    expect(await viewButton.getText()).to.equal('View');

    const backButton = await driver.findElement(By.css('vaadin-button:last-child'));
    expect(backButton).to.exist;
    expect(await backButton.getText()).to.equal('Back');
  });

});

// describe('TrainingHistoryView', function () {
//   let browser:WebDriver;

//   before(async function () {
//     this.timeout(20000);
//     browser = await new Builder()
//       .withCapabilities(Capabilities.chrome())
//       .build();

//     await browser.get('http://localhost:8080/TrainingHistory');
//   });

//   after(async function () {
//     await browser.quit();
//   });

//   it('should redirect to the home page when clicking the "Back" button', async function () {
//     this.timeout(10000);
//     const backButton = await browser.findElement(By.xpath('//vaadin-button[contains(text(),"Back")]'));
//     await backButton.click();
//     await browser.wait(until.urlIs('http://localhost:8080/'), 5000);
//     expect(await browser.getCurrentUrl()).to.equal('http://localhost:8080/');
//   });

//   it('should have the correct number of rows in the training history table', async function () {
//     this.timeout(10000);
//     await browser.get('http://localhost:8080/TrainingHistory');
//     const rows = await browser.wait(until.elementsLocated(By.css('vaadin-grid-cell-content')), 5000);
//     expect(rows.length).to.equal(6);
//   });

//   it('should display the correct training history data', async function () {
//     this.timeout(10000);
//     const registeredDates = [
//       '2019-01-16',
//       '2020-01-16',
//     ];
//     const courses = [
//       'Ski Patrol Course 1',
//       'Ski Patrol Course 2',
//     ];
//     const completedDates = [
//       '2019-10-30',
//       '2020-10-30',
//     ];

//     const rows = await browser.wait(until.elementsLocated(By.css('vaadin-grid-cell-content')), 5000);
//     for (let i = 0; i < 2; i++) {
//       expect(await rows[i * 3].getText()).to.equal(registeredDates[i]);
//       expect(await rows[i * 3 + 1].getText()).to.equal(courses[i]);
//       expect(await rows[i * 3 + 2].getText()).to.equal(completedDates[i]);
//     }
//   });
// });