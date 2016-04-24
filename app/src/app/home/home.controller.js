export default ngInject(function HomeController($scope, $mdDialog) {
  let pusher = new Pusher('01854462579932b51fb6', {
    cluster: 'eu',
    authEndpoint: 'http://localhost:5000/pusher/auth'
  });
  $scope.answers = [];

  let showPrompt = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt()
          .title('What\'s your name?')
          .placeholder('Type your name here')
          .targetEvent(ev)
          .ok('Done!')
          .cancel('Leave me alone...');
    $mdDialog.show(confirm).then(function(result) {
      $scope.name = result;

      let answerBox = pusher.subscribe('private-answer-box');
      let userBox = pusher.subscribe('private-user-' + result);
      answerBox.bind('pusher:subscription_succeeded', () => {
        answerBox.trigger('client-logged-in', {
          name: result
        });
      });

      userBox.bind('client-refresh-questions', (data) => {
        $scope.questions = data[0];
        $scope.answers = data[1];
        $scope.answers.map((answer, index) => {
          if(answer >= 0) {
            $scope.questions[index].isDisabled = true;
          }
        });
        $scope.$apply();
      });

      $scope.setAnswer = (data) => {
        $scope.questions[data.questionId].isDisabled = true;
        answerBox.trigger('client-new-answer', {
          user: result,
          question: data.questionId,
          answer: $scope.answers[data.questionId]
        });
      };
    }, function() {
      showPrompt();
    });
  };

  showPrompt();
});
