export default defineContentScript({
  matches: ['https://*/*', 'http://*/*'],
  main() {
    console.log('Hello content.');
  },
});
