function choiceTitleName(path: string) {
  let title: string = '';
  switch (path) {
    case '/':
      title = 'Home';
      break;
    case '/signin':
    case '/signup':
      title = '';
      break;
    default:
      title = 'Element';
      break;
  }
  return title;
}

export default choiceTitleName;
