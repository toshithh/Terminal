class Terminal{
    closeButton="term-close";
    header = "term-head";
    UIspace = "user-space";

    constructor(id, user="User", customAction=false){
        this.divID = id;
        this.curr_inp_id = 0;
        this.history = [];
        this.user = user;
        console.log(this.user.length);
        this.customAction = customAction;
        var T = this;
        $(document).ready(function(){
            document.getElementById(T.header).innerHTML+=user;
            
            $("#"+T.closeButton).click(function(){
                $("#"+T.divID).hide();
            });

            $("#"+T.divID).click(function(){
                T.focus_curr();
            })
            T.responseWrapper();
            T.styling();
        });
    }

    set Response(content){
        document.getElementById(this.UIspace).innerHTML += "<p>" + content + "</p>";
    }

    addEnterListener(){
        var T = this;
        $("#cmd_"+T.curr_inp_id)[0].addEventListener("keypress", function(event){
            if(event.key == "Enter"){
                event.preventDefault();
                T.submit();
            }
        })
    }

    submit(){
        var T = this;
        if($(document.activeElement).is("#cmd_"+T.curr_inp_id) == true){
            var cmd = document.getElementById("cmd_" + T.curr_inp_id).value;
            console.log(cmd);
            T.history[T.history.length] = cmd;
            if(T.customAction){
                T.customAction(cmd); //inherit terminal and define customAction(cmd)
            }else{
                T.action(cmd);
            }
        }
    }

    responseWrapper(){
        this.curr_inp_id += 1;
        var content = "<table class='user'>\
            <tr>\
                <td style='width: "+(this.user.length+5)+"ch;' class='unm'>\
                    <font class=\"u\"><font color=\"lawngreen\">"+this.user+"</font>:<font class=\"symb\">~ $ </font></font>\
                </td>\
                <td style=\"min-width: 80%;\">\
                    <input type=\"text\" class=\"user-inp\" id=\"cmd_"+this.curr_inp_id+"\" autocomplete='off'>\
                </td>\
            </tr>\
        </table>"
        document.getElementById(this.UIspace).innerHTML += content;
        var i = 1;
        for (var x in this.history){
            $("#cmd_"+i).val(this.history[i-1]);
            i++;
        }
        this.addEnterListener();
        this.focus_curr();
    }

    action(cmd){
        if(cmd==''){
            this.responseWrapper();
            return;
        }
        if(cmd=='clear'){
            window.location.href = window.location.href;
        }
        //Add commands such as exit or clear with if-else
        var T = this;
        //Call custom function from here if you want
        
        //var resp = T.customFunction(cmd); //inherit and define customFunction(You don't need to use customAction if you use this)
        var resp = "Remove this on adding custom function";
        T.Response = resp;
        T.responseWrapper();
    }

    focus_curr(){
        $("#cmd_"+this.curr_inp_id).focus();
    }

    styling(){
        var userspace = document.getElementById(this.UIspace);
        var divH = document.getElementById(this.divID).clientHeight;
        userspace.style.height = (divH-3*16)+"px";
    }
}