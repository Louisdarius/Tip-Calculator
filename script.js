
// This Module has all the DOM Objects 
var userModule = (function (){

    var domStrings = {
        bill: '.billInput',
        service: '.service',
        calculateBtn: '.calculatorBtn',
        billEntered: '.billEnteredValue',
        tip: '.tipAmountValue',
        totalBill: '.totalBillValue',
        hidden: '.hide'
    };

    // Public methods
    return {
        getDomStrings: function (){
            return domStrings;
        },
        getInput: function (){
            return{           
                 bill: parseFloat(document.querySelector(domStrings.bill).value),         
                 service: parseFloat(document.querySelector(domStrings.service).value)
            };
        },
        displayData: function (bill, tip, totalBill){
            // show data container
            var showDataContainer = document.getElementsByClassName('hide');
            for(var i = 0; i < showDataContainer.length; i++) {
                showDataContainer[i].style.display = 'block';
            }
            // Display the contents
            document.querySelector(domStrings.billEntered).textContent = bill;
            document.querySelector(domStrings.tip).textContent = tip;
            document.querySelector(domStrings.totalBill).textContent = totalBill;
        },
        clearFields: function () {
            var fields = document.getElementsByClassName('clear');
            fields[0].value = '';
            for (var i = 0; i < fields.length; i++) {
                if ( fields[i] !== 0) {
                     fields[i].textContent = 0;
                }
               
            }
        }
    };

})();


// Data module
var dataModule = (function (){

    var data = {
        bill: 0,
        service: 0,
        tip: 0,
        totalBill: 0
    };


    return {
        calculate: function (inp) {            
            data.bill = inp.bill;
            data.service = inp.service;

            // Calculate the tip
            data.tip = (data.bill * data.service) / 100;

            // Calculate total bill
            data.totalBill = data.bill + data.tip;
        },
        getData: function () {
            return {
                bill: data.bill,
                service: data.service,
                tip: data.tip,
                totalBill: data.totalBill
            };
        }
        
    };

})();


// Main module
var mainModule = (function (usMod, dtMod){


    var setUpEventListener = function (){      
        var mainDomStrings;
        mainDomStrings = usMod.getDomStrings();

    // setting the event listener 
    document.querySelector(mainDomStrings.calculateBtn).addEventListener('click', process);

    //Event listener for enter return key (keycode:13)
    document.addEventListener('keypress', function (ev) {
        if (ev.keyCode == 13 || ev.which === 13) { 
            process();
        }
    });

    // Event listener to clear the fields
    document.querySelector(mainDomStrings.bill).addEventListener('focus', usMod.clearFields);

};

 var process = function (){
     var input, calculator, data, display;

     
     // 1. Get inputs(bill & service quality) from user   
        input = usMod.getInput();

        if (input.bill > 0) { 
             // 2. Calculate data         
             calculator = dtMod.calculate(input);

            // Get the data
              data = dtMod.getData();

           // Display the data to user interface
            display = usMod.displayData(data.bill, data.tip, data.totalBill);

        }

    
    };


    return {
        start: function (){
            console.log('Application has started');
            setUpEventListener();
        }
    };
    
})(userModule, dataModule);

mainModule.start();