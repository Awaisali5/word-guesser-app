// function IsLetter(letter){
//     return /^[a-zA-Z]$/.test(letter);
// }

// document.getElementById("text").addEventListener("keydown", function (event){

//     if(!IsLetter(event.key)){
//         event.preventDefault();
//     }
// });


const Letters=document.querySelectorAll(".score-letter");

const LoadingDiv=document.getElementsByClassName(".info-bar");


const ANSWER_LENGTHS=5;

const Rounds=6;


// making a function which will run as the web is visited 

async function Init(){

    let current_Guess='';
    let current_row=0;
    let isLoading=true;
   


    // fetching the word from the api 
    const res=await fetch("https://words.dev-apis.com/word-of-the-day");

    const resObj=await res.json();

    const word=resObj.word.toUpperCase();

    // to make another splitted array 

    const wordParts=word.split("");

    // to check the user win or lost 
    let done=false;

    // to check the loading 

    isLoading=false;
    // setLoading(isLoading);

    
    
    console.log(wordParts);

    

  
   

    // to add a letters 
    
    function AddLetter(letter){


        // add last letter to end 
        
        if(current_Guess.length<ANSWER_LENGTHS){
           current_Guess +=letter; 

        //    replace the last letter 
        }else
        {
            current_Guess=current_Guess.substring(0,current_Guess.length -1) + letter;
        }


        Letters[ANSWER_LENGTHS*current_row +current_Guess.length-1].innerText=letter;
    };



    // to verify the enter letter is between a-z only 
    
    function IsLetter(letter){
            return /^[a-zA-Z]$/.test(letter);
        };



        // Commit function which will submitted the word whenever the Enter is pressed 

        async function commit(){
         if(current_Guess.length != ANSWER_LENGTHS){
            return;

         }

            // this will do nothing as the current-guess is not equal to ANSWER_LENGTHS 
            
            //todo validate the word


    //  const res = await fetch("https://words.dev-apis.com/validate-word", {
    //   method: "POST",
    //   body: JSON.stringify({ word: current_Guess }),
    // });

    // const { validWord } = await res.json();

    

    //  // not valid, mark the word as invalid and return
    //  if (!validWord) {
    //     markInvalidWord();
    //     return;
    //   }

    

        
         




         // todo do all the marking like wrong ,right or invalid

         const GuessParts=current_Guess.split('');

         let map=MakeMap(wordParts);

        


       


       

        //  check for right 
        for(let i=0;i<ANSWER_LENGTHS;i++){
            if(GuessParts[i] === wordParts[i]) {
                Letters[current_row * ANSWER_LENGTHS + i].classList.add('correct');
                map[GuessParts[i]]--;
            }
        };


        // to make the wrong and close 

        for(let i=0; i<ANSWER_LENGTHS; i++){
            if(GuessParts[i] === wordParts[i]){
                // do Nothin
            }else if(wordParts.includes(GuessParts[i]) &&  map[GuessParts[i]]> 0){

                Letters[current_row * ANSWER_LENGTHS + i].classList.add('close');
                map[GuessParts[i]]--;

            }else{
                Letters[current_row * ANSWER_LENGTHS + i].classList.add('wrong');
            }
        }


        //  initalizing the current word and row  + this increase current row to 1
        
        current_row++;
        
        //todo determine the winner or loser
        
        //  when someone won 
        
        if(current_Guess === word){
            alert("Yuy! You Won This!");
            done=true;
            document.querySelector(".brand").classList.add('winner');
            
        }

        current_Guess='';

        //  when some lose 


        if(current_row === Rounds){
            
            alert(`Oh! you lost! The Correct Word is ${word}`)
            done=true;
         
        }






        }

        // Backspace function will work to erase the letter by one word 

        function BackSpace(){
           current_Guess=current_Guess.substring(0,current_Guess.length-1);

           Letters[ANSWER_LENGTHS*current_row + current_Guess.length].innerText='';

    
        }


    // let the user know that their guess wasn't a real word
  // skip this if you're not doing guess validation

//   function markInvalidWord() {
//     for (let i = 0; i < ANSWER_LENGTHS; i++) {
//       Letters[current_row * ANSWER_LENGTHS + i].classList.remove("invalid");

//       // long enough for the browser to repaint without the "invalid class" so we can then add it again
//       setTimeout(
//         () => Letters[current_row * ANSWER_LENGTHS + i].classList.add("invalid"),
//         10
//       );
//     }
//   }



    // Handling the Entered Letters 

    document.addEventListener("keydown", function KeyPress (event){


        const action=event.key;

      
        // control flow according to requirement 

        if(action === 'Enter'){
            commit();
        }else if(action === 'Backspace'){
            BackSpace();
        }else if(IsLetter(action)){
            AddLetter(action.toUpperCase());
        }
        else{
            // this will do nothing 
        }

    });

}

//Loading state

// function setLoading(isLoading) {
//      LoadingDiv.classList.add("show", isLoading);
//   }



// to keep track of the total words 

function MakeMap(array){
    const obj={};

    for(let i=0; i<array.length; i++){
        const ltr=array[i];

        if(obj[ltr]){
            obj[ltr]++;
        }
        else{
            obj[ltr]= 1;
        }
    }
    return obj;
}
  

Init();