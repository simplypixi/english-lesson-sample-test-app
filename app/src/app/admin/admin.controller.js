import _ from 'lodash';

export default ngInject(function HomeController($scope, $mdDialog) {
  $scope.answers = {};
  $scope.questions = [{
    question: 'What’s HTML?',
    answers: ['HyperText Markup Language', 'HyperTurbo Markup Language', 'HyperText Man Language', 'HyperText Markup Langouste'],
    correct: 1
  }, {
    question: 'In which browser you can open website created by HTML?',
    answers: ['chrome, firefox', 'only IE and Edge', 'safari', 'all'],
    correct: 4
  }, {
    question: 'Do u remember what mini’s color has HTML girl?',
    answers: ['red', 'blue', 'orange', 'black'],
    correct: 3
  }, {
    question: 'What’s CSS?',
    answers: ['Cascade Style Sheet', 'Cosmo Super Saiyan', 'Cascade Sheet Style', 'Cascade Space Sheet'],
    correct: 1
  }, {
    question: 'Which is CSS’s framework?',
    answers: ['Angular', 'Foundation', 'Backbone', 'Batsrtap'],
    correct: 2
  }, {
    question: 'Do you remember what hair‘s color has CSS girl?',
    answers: ['brown', 'black', 'blond', 'pink'],
    correct: 1
  }, {
    question: 'JavaScript is not...',
    answers: ['a Java', 'dynamic language', 'untyped language'],
    correct: 1
  }, {
    question: 'Javascript is used ________ HTML & CSS. ',
    answers: ['without', 'with', 'instead'],
    correct: 2
  }, {
    question: 'Raspberry PI is...',
    answers: ['Math Theory,', 'tiny and affordable computer', 'Barack Obama\'s favorite dessert'],
    correct: 2
  }];

  let pusher = new Pusher('01854462579932b51fb6', {
    cluster: 'eu',
    authEndpoint: 'http://doreki.pl:5000/pusher/auth'
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
