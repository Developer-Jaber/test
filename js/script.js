// ==============loding data hear====================================================
// lode the button category
fetch('https://openapi.programming-hero.com/api/peddy/categories')
.then(res => res.json())
.then(data => displayButtonArea(data.categories))
.catch(err => console.log(err))

// lode the Card section
const lodeCardSection = (sortPrice) => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then(res => res.json())
    .then(data => {if(sortPrice === 'sortPrice'){
      const decendingArray = data.pets.sort(function(a,b){return a.price - b.price});
      displayCategory(decendingArray);
    }else{
        displayCategory(data.pets)
    }})
    .catch(err => console.log(err))
}

// remove active class function
const removeActiveClass = () => {
   const buttons = document.getElementsByClassName('caregory-btn');
    for(let btn of buttons){
        btn.classList.remove('active')
    }
};

const showCategory = (category) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then(res => res.json())
    .then(data => {
        removeActiveClass()
      const activeBtn = document.getElementById(`btn-${category}`)
      activeBtn.classList.add('active')
      displayCategory(data.data)
    })
    .catch(err => console.log(err))
}

// lode modal details
const lodeModalDetails = async(id) => {
    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${id}`
    const res = await fetch(uri);
    const data =await res.json();
    displayDitails(data.petData);
}

const displayDitails = (details) => {
    const detailsContainer = document.getElementById('modal-content')
    detailsContainer.innerHTML = `
    <img class="w-full rounded-lg object-cover" src="${details.image}" alt="petImg">
    <h2 class="card-title my-2 font-extrabold">${details.pet_name}</h2>
    <div class="flex">
        <div>
            <div class="flex">
                <span><img src="https://img.icons8.com/?size=24&id=jQkL4uOqbTW7&format=png" alt="breed icon"></span>
                <span class="mx-2 font-somthing-bold text-gray-500">Breed: ${details?.breed? details.breed : `<span class="text-red-500">not available !</span>`}</span>
            </div>

            <div class="flex">
                <span><img src="https://img.icons8.com/?size=24&id=84997&format=png" alt="Birth icon"></span>
                <span class="mx-2 font-somthing-bold text-gray-500">Birth: ${details?.date_of_birth? details.date_of_birth : `<span class="text-red-500">not available !</span>`}</span>
            </div>

            <div class="flex">
                <span class="w-6"><img src="https://img.icons8.com/?size=32&id=15236&format=png" alt="Gender icon"></span>
                <span class="mx-2 font-somthing-bold text-gray-500">Gender: ${details?.gender? details.gender : `<span class="text-red-500">not available !</span>`}</span>
            </div>

            
        </div>
        <div>
            <div class="flex">
                <span class="mx-2 text-lg font-bold">&#36</span>
                <span class="mx-2 font-somthing-bold text-gray-500">Price: ${details?.price? details.price+'$' : `<span class="text-red-500">not available !</span>`}</span>
            </div>

            <div class="flex">
                <span class="mx-2 text-lg font-bold "><img class="w-[20px]" src="https://img.icons8.com/?size=80&id=vvaQqnajVGxZ&format=png"></span>
                <span class="mx-1 font-somthing-bold text-gray-500">Vaccinated: ${details?.vaccinated_status? details.vaccinated_status : `<span class="text-red-500">not available !</span>`}</span>
            </div>
        </div>
    </div>
    <hr class="my-3">
    <div>
        <h1 class="text-md font-extrabold">Details Information</h1>
        <p>${details.pet_details}</p>
    </div>
    
    `
    document.getElementById('show-modal-data').click();
}


const showAdoptedModal = () => {
    document.getElementById('show-adoptaed-modal').click();
    const adoptModalContent = document.getElementById('adoptation-modal-content');
    adoptModalContent.innerHTML = `
    <div class="block text-center">
        <img class="mx-auto" src="https://img.icons8.com/?size=80&id=JDJpJPFVUvFU&format=png" alt="handshake">
        <h1 class="text-3xl font-extrabold">Congrates</h1>
        <p class="text-lg font-semibold">Adoption process is start for you pet</p>
        <h1 id="value" class="text-2xl font-bold">3</h1>
    </div>
    `

    let countdownValue = 3
    const countDoun = setInterval(() => {
    document.getElementById('value').innerText = countdownValue;
        countdownValue--
        
        if(countdownValue < 0){
            clearInterval(countDoun);
            document.getElementById('close-adopt-modal').click();
            
        }
    }, 1000);
}



// ==============Adding function hear====================================================
// adding the dynamic button ssection
const displayButtonArea = (categories) => {
    categories.forEach(item => {
        // get the button conatiner
        const buttonContainer  = document.getElementById('button-container');

        // create dynamic button for showing button section
        const button = document.createElement('div');
        button.classList = "col-span-1"
        button.innerHTML = `
          <button id="btn-${item.category}" onclick="showCategory('${item.category}')" class="flex caregory-btn align-middle border-2 border-gray-200 px-3 md:px-20 py-2 md:py-5 rounded-2xl gap-2">
            <img class="sm:w-10 md:w-14" src="${item.category_icon}" alt="">
            <span class="text-lg md:text-2xl my-4 font-extrabold">${item.category}</span>
          </button>
        `


        buttonContainer.appendChild(button);
    });
    
}


// Loding spinner
function lodingSpinner(){
    const cardArea = document.getElementById('card-area')
    const spinner = document.createElement('div');
    spinner.classList = 'w-20 flex justify-center mx-auto'
    spinner.innerHTML = `<span class="loading loading-bars loading-lg"></span>`
    cardArea.appendChild(spinner);
    setTimeout(() => {
        spinner.classList = 'hidden'
    },2000);

}


// adding the dynamic card section
const displayCategory = (pets) => {   
    //get the card container
    const cardContainer = document.getElementById('all-pet-card')
    cardContainer.innerHTML = ""

    if(pets.length ==0 ){
        cardContainer.classList.remove('grid')
        cardContainer.innerHTML = `
            <div class="hero w-[100%] justify-center items-center">
                <div class="hero-content text-center">
                    <div class="max-w-7xl">
                    <img class="mx-auto" src="./images/error.webp" alt="no-content">
                    <h1 class="text-5xl font-bold">No Information Available</h1>
                    <p class="py-6">
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
                        its layout. The point of using Lorem Ipsum is that it has a.
                    </p>
                    </div>
                </div>
            </div>
        `
        return
    }else{
        cardContainer.classList.add('grid')
    }
    lodingSpinner()
    pets.forEach(item => {
        
        // create pet card
        const card = document.createElement('div');
        card.classList = 'card col-1 border-2 border-gray-200'
        card.innerHTML = `
                <figure class="mx-3 mt-3">
                    <img
                    class="rounded-lg"
                    src="${item.image}"
                    alt="Shoes" />
                </figure>
                <div class="card-body p-5">
                    <h2 class="card-title text-xl font-extrabold">${item.pet_name}</h2>
                    <div class="flex">
                        <span><img src="https://img.icons8.com/?size=24&id=jQkL4uOqbTW7&format=png" alt="breed icon"></span>
                        <span class="mx-2 font-bold text-gray-500">Breed: ${item?.breed? item.breed : `<span class="text-red-500">not available !</span>`}</span>
                    </div>

                    <div class="flex">
                        <span><img src="https://img.icons8.com/?size=24&id=84997&format=png" alt="Birth icon"></span>
                        <span class="mx-2 font-bold text-gray-500">Birth: ${item?.date_of_birth? item.date_of_birth : `<span class="text-red-500">not available !</span>`}</span>
                    </div>

                    <div class="flex">
                        <span class="w-6"><img src="https://img.icons8.com/?size=32&id=15236&format=png" alt="Gender icon"></span>
                        <span class="mx-2 font-bold text-gray-500">Gender: ${item?.gender? item.gender : `<span class="text-red-500">not available !</span>`}</span>
                    </div>

                    <div class="flex">
                        <span class="mx-2 text-lg font-bold">&#36</span>
                        <span class="mx-2 font-bold text-gray-500">Price: ${item?.price? item.price+'$' : `<span class="text-red-500">not available !</span>`}</span>
                    </div>
                    <div class="card-actions border-t-2 border-gray-300 justify-between pt-3">
                        <button onclick="displayLikedImage('${item.image}')" class="bg-white like-button font-extrabold btn btn btn-sm"><img src="https://img.icons8.com/?size=24&id=u8MTpAq972MG&format=png" alt="like"></button>
                        <button class="adopt-btn btn btn-sm text-main-btn font-extrabold bg-white">Adopt</button>
                        <button onclick="lodeModalDetails(${item.petId})" class="btn btn btn-sm text-main-btn font-extrabold bg-white">Details</button>
                    </div>
                </div>
        `  
        

        setTimeout(() => {
            return cardContainer.appendChild(card)
        }, 2000);

        const change = document.querySelector('.adopt-btn')
            console.log(change)
             change.addEventListener('click',()=>{
                showAdoptedModal();
                 change.innerText = 'Adopted'
                change.setAttribute('disable');
            })

    });
    
}



const displayLikedImage = (image) => {
   const likedImgContainer = document.getElementById('liked-pet-conatiner');

   const likedImg = document.createElement('img')
   likedImg.src = image
   likedImg.classList = "rounded-lg"

   likedImgContainer.appendChild(likedImg);
}

// sort button event
document.getElementById('sort-btn').addEventListener('click',()=>{
    // console.log('sort button is clicked');
    lodeCardSection('sortPrice');
});

lodeCardSection();

// ==============Add event handeller function hear====================================================


    // const likedImg = (imagee) => {
        
    //     const displayLikedArea = document.getElementById('liked-pet-conatiner')
    //     const likeImage = document.createElement('div')
    //     likeImage.innerHTML = `
    //         <img src="${imagee}" alt="like">
    //     `

    //     displayLikedArea.appendChild(likeImage)
    // }


// ==============call function hear===================================================================

// displayCategory();