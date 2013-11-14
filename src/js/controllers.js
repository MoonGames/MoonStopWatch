/*
 * Copyright (C) 2013 Martin Indra <aktive at seznam.cz>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var moonStopWatch = angular.module('MoonStopWatch', []);

moonStopWatch.controller('MoonStopWatchCtrl', function MoonStopWatchCtrl($scope, $timeout) {

  // init to 0
  updateFormattedTime(0);

  $scope.reset = resetClock;

  function resetClock() {
      // cancel update cycle
      $timeout.cancel($scope.updateTimeoutPromise);
      // reset the time
      $scope.startTime = new Date().getTime();
      // start new updating cycle
      updateClock();
  }

  function updateClock() {
      var now = new Date().getTime(),
          // how much time has passed
          diff = now - $scope.startTime;

      updateFormattedTime(diff);

      // update again after some time
      $scope.updateTimeoutPromise = $timeout(updateClock, 100, true);
  }

  /**
   * Updates displayed time.
   *
   * @param {Number} miliseconds how much time to display formatted
   */
  function updateFormattedTime(miliseconds) {
      var hours,
          minutes,
          seconds;

      hours = Math.floor(miliseconds / (60 * 60 * 1000));
      miliseconds -= hours * 60 * 60 * 1000;

      minutes = Math.floor(miliseconds / (60 * 1000));
      miliseconds -= minutes * 60 * 1000;

      seconds = Math.floor(miliseconds / 1000);
      miliseconds -= seconds * 1000;

      $scope.formattedTime = {
        miliseconds: miliseconds,
        seconds: seconds,
        minutes: minutes,
        hours: hours
    };
  }
});
