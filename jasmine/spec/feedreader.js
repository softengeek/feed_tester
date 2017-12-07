/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  //Testing RSS Feeds
    describe('RSS Feeds', function() {
      //ensure the allfeeds is defined and has feed in it
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

         //test to ensure feed urls are defined and are not empty
         it ('urls are defined and not empty', function() {
           for (const feed of allFeeds) {
             expect(feed.url).toBeDefined();
             expect(feed.url).not.toBe('');
           }
         });

         //test to ensure feed names are present and are defined
         it ('names are defined and not empty', function() {
           for (const feed of allFeeds) {
             expect(feed.name).toBeDefined();
             expect(feed.name).not.toBe('');
           }
         });
    });

    //test the menu
    describe('The menu', function() {

        //ensure that the menu is hidden by default or on page load
         it('is hidden by default', function() {
           const menu = $('.menu-hidden');
           expect(menu.length).toBeGreaterThan(0);
         });

         //enusre that the visibility of the menu changes on each click
         it ('menu changes visibility on click', function() {
            const menuLink = $('.menu-icon-link');
            menuLink.trigger('click'); //Trigger click to show menu

            let menu = $('.menu-hidden');
            expect(menu.length).toBe(0);

            menuLink.trigger('click'); //Trigger click to hide menu
            menu = $('.menu-hidden');

            expect(menu.length).toBe(1);
          });
    });

    describe('Initial Entries', function() {
          //asynchronous Function to call loadfeed before the test is carried out
         beforeEach(function(done) {
           loadFeed(0, done);
         });

         //ensure that there is at elast one entry after loadFeed is called
         it('ensure single entry is in feed container', function() {
           const feed = $('.feed');
           expect(loadFeed).toBeDefined();
           expect(feed.children().length).toBeGreaterThan(0);
         })
    });

    //test new feeds
    describe('New Feed Selection', function() {
         //asynchronous Function to call loadfeed before the test is carried out
         beforeEach(function(done) {
           const feed = $('.feed').html();
           loadFeed(0, done);
         });

         //test to ensure that new feed is loaded every time LoadFeed is called
         it ('to test that new feed is loaded on loadFeed', function() {
           const newFeed = $('feed').html();
           expect(newFeed).not.toEqual(feed);
         });
     });

}());
