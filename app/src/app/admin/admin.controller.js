import _ from 'lodash';

export default ngInject(function HomeController($scope, $mdDialog) {
  $scope.answers = {};
  $scope.questions = [{
    question: 'Testowe',
    answers: ['Dupa', 'dupa 2', 'we', 'wewer'],
    correct: 2
  }, {
    question: 'Testowe',
    answers: ['Dupa', 'dupa 2', 'we', 'wer'],
    correct: 1
  }];

  let pusher = new Pusher('01854462579932b51fb6', {
    cluster: 'eu',
    authEndpoint: 'http://localhost:5000/pusher/auth'
  });
  let answerBox = pusher.subscribe('private-answer-box');

  let calcPoints = (answers) => {
    let results = $scope.questions.map((q, index) => {
      if (answers[index] >= 0 && answers[index] + 1 === q.correct) {
        return 1;
      }

      return 0;
    });
    return _.sum(results) / $scope.questions.length * 100;
  };

  $scope.addNew = () => {
    $scope.questions.push({
      question: '',
      answers: ['', '', '', ''],
      correct: 1
    });
  };

  answerBox.bind('client-logged-in', (user) => {
    let userBox = pusher.subscribe('private-user-' + user.name);
    if (!$scope.answers[user.name]) {
      $scope.answers[user.name] = user;
      $scope.answers[user.name].answers = [];

      userBox.bind('pusher:subscription_succeeded', () => {
        userBox.trigger('client-refresh-questions', [
          $scope.questions, $scope.answers[user.name].answers
        ]);
      });
    } else {
      userBox.trigger('client-refresh-questions', [
        $scope.questions, $scope.answers[user.name].answers
      ]);
    }
    $scope.$apply();
  });

  answerBox.bind('client-new-answer', (data) => {
    if (!$scope.answers[data.user]) {
      return null;
    }

    $scope.answers[data.user].answers[data.question] = data.answer;
    $scope.answers[data.user].points = calcPoints($scope.answers[data.user].answers);
    $scope.$apply();
  });
});
