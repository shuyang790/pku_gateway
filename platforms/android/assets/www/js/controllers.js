angular.module('app.controllers', [])

.controller('pKUGatewayToolCtrl', function($scope, $http) {

    $scope.formData = {"username1": "", "password": ""}

    $http.get("json/account.json")
    .success(function(account){
        $scope.formData = account;
    })

    $scope.save = function(data){

        if(!data) {
            console.error('Console.save: No data')
            return;
        }

        var filename = 'download.json'

        if(typeof data === "object"){
            data = JSON.stringify(data)
        }

        var blob = new Blob([data], {type: 'text/json'}),
            e    = document.createEvent('MouseEvents'),
            a    = document.createElement('a')

        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }


    $scope.processForm = function(operation, range) {

        $scope.info = "true";

        $http.get("https://its.pku.edu.cn:5428/ipgatewayofpku", {
            params: {
                "uid": $scope.formData.username1,
                "password": $scope.formData.password,
                "range": range,
                "operation": operation,
                "timeout": "1"
            }
        })

          .success(function(data) {
            console.log(data);
            // alert("success");

            var idx = data.indexOf("<tr align=CENTER");
            var idx2 = data.indexOf("<tr align=center>");
            if ( idx2 != -1)
                idx = idx2;
            var str = data.substring(idx);
            var start = str.indexOf("<td>") + 4;
            var end = str.indexOf("<br>");
            $scope.response = str.substring(start, end);

            if (operation == "connect") {
                var idx = data.indexOf("用&nbsp;户&nbsp;名");
                var str = data.substring(idx);
                var start = str.indexOf("<td>") + 4;
                var end = str.indexOf("</td></tr>");
                $scope.username = "用户名：" + str.substring(start, end);


                idx = data.indexOf("访问范围");
                str = data.substring(idx);
                start = str.indexOf("<td>") + 4;
                end = str.indexOf("</td></tr>");
                $scope.constatus = "当前访问范围：" + str.substring(start, end);

                idx = data.indexOf("当前连接");
                str = data.substring(idx);
                start = str.indexOf("<td>") + 4;
                end = str.indexOf("</td></tr>");
                $scope.count = "当前连接：" + str.substring(start, end);

                idx = data.indexOf("当前地址");
                str = data.substring(idx);
                start = str.indexOf("<td>") + 4;
                end = str.indexOf("</td></tr>");
                $scope.ipaddress = "当前地址：" + str.substring(start, end);

                idx = data.indexOf("包月状态");
                str = data.substring(idx);
                start = str.indexOf("<td>") + 4;
                end = str.indexOf("</td></tr>");
                payment = str.substring(start, end);

                idx = data.indexOf("包月累计");
                str = data.substring(idx);
                start = str.indexOf("<td>") + 4;
                end = str.indexOf("</td></tr>");
                $scope.timecount = "包月累计时长：" + str.substring(start, end) + "(" + payment + ")";

                idx = data.indexOf("余额");
                str = data.substring(idx);
                start = str.indexOf("<td>") + 4;
                end = str.indexOf("</td></tr>");
                $scope.balance = "账户余额：" + str.substring(start, end);

                $scope.connect = 1;
            }
            else {

                $scope.connect = "";
            }

            // $scope.message = data;

            // $scope.save($scope.formData);
            // $http.post("json/account.json", $scope.formData)
            // .error(function(data){
            //     alert("save account error: " + data);
            // })
          })
          .error(function(data) {
              alert("error");
              $scope.message = "error ";
          })
        };


          $scope.add = function() {
                var alarmTime = new Date();
                alarmTime.setMinutes(alarmTime.getMinutes() + 1);
                $cordovaLocalNotification.add({
                    id: "1234",
                    date: alarmTime,
                    message: "This is a message",
                    title: "This is a title",
                    //autoCancel: true,
                    sound: null
                }).then(function () {
                    console.log("The notification has been set");
                });
            };


})
