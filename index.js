/* Panagiotis Tsapanidis - Webb21 Individuelluppgit */

const productsContainer = document.getElementById("productsContainer")
            const url = "https://mock-data-api.firebaseio.com/webb21/products.json" 
            let total = 0
            const totalH3 = document.getElementById("total")
            document.getElementById("bootstrapAlert").style.display = "none"

            
           //-----------------getUserInput()----------------------------
           function getUserInput(){
               //Save user input into a value
               const filterValue = parseInt(document.getElementById("filterByRating").value)
               
               return filterValue
            }//end of getUserInput()
            


            //-----------------filterFunction()----------------------------
            /*
            Create a function that renders only the API content with rating equal or greater than 
            "filterByRating" input value in an HTML file.
            8. Lägg till ett input-fält och en knapp högst uppe på sidan. I denna ska användaren kunna mata in en siffra. 
               När användaren trycker på knappen ska sidan filtrera produkterna så att endast produkter 
               med rating större än eller lika med siffran syns.
            */
            function filterFunction(){
                
                //Get the value that the user put in the "filterByRating" input
                getUserInput()
                
                const parent = document.getElementById("productsContainer")

                //Check if the user put a number between 0-5. If not, show an error message.
                if(getUserInput() >= 0 && getUserInput() <= 5){
                    document.getElementById("bootstrapAlert").style.display = "none"
                    
                    //Make all children (products) visible again by changing the display value of each child to "block"
                    for(let i = 0; i < parent.children.length; i++){
                        parent.children[i].style.display = "block"
                    }//end of for loop

                    /* Make invisble the children (products) whose rating value is lower than getUserInput() or is "undefined" 
                    by changing the display value of each child to "block" */
                    for(let j = 0; j < parent.children.length; j++){
                        //If getUserInput() == 0 then keep all product plus the products with "undefined" rating value visible
                        if(getUserInput() == 0 && parent.children[j].children[1].children[4].value === undefined){
                            parent.children[j].style.display = "block"
                        }
                        //If getUserInput() greater than product rating value or rating "undefined" make them invisible
                        else if(parent.children[j].children[1].children[4].value < getUserInput() || parent.children[j].children[1].children[4].value === undefined){
                            parent.children[j].style.display = "none"
                        }
                    }//end of for loop
                    
                } else {
                    document.getElementById("bootstrapAlert").style.display = "inline-block"
                }//end of if
                
            }//end of filterFunction()
           
            
            
            //-----------------renderProductItem(productItem)----------------------------
            //1. Rendera ut innehållet från API:t i en HTML-fil)
            //2. Varje produkt ska renderas med name, description, image, price, rating och stock
            function renderProductItem(productItem){
                //create a productDiv to create HTML elements of all attributes of one product
                // const productDiv = document.createElement("div")
                // productDiv.setAttribute("id", "productDiv")
                
                /*create HTML elements for each product attribute (description, id, images(alt, src (large, medium, small)), 
                name, price, rating, stock)*/
                const description = document.createElement("p")
                const id = document.createElement("p")
                const imgSrc = document.createElement("img")
                const name = document.createElement("h5")
                const price = document.createElement("p")
                const rating = document.createElement("p")
                const stock = document.createElement("p")

                //Create a buy button HTML element for every product
                const buyButton = document.createElement("button")
                buyButton.className = "buyButton"

                //Create hr to visually break up every product
                const hr = document.createElement("hr")
                hr.setAttribute("id", "hrStyled")
                
                //Assign each value to its corresponding HTML element
                description.innerText = productItem.description
                id.innerText = productItem.id
                name.innerText = productItem.name
                price.innerText = price.innerText = `Price: ${productItem.price} kr`
                rating.innerText = `Rating: ${productItem.rating}`
                rating.setAttribute("id", "rating")
                rating.value = productItem.rating
                stock.innerText = `Units in Stock: ${productItem.stock}`
                imgSrc.src = productItem.images[0].src.small
                
                //Assign "Köp" text to every buyButton
                buyButton.innerText = "Köp"
                
                
                const basketContents = document.getElementById("basketContents")
                //---------addToBasket()---------
                buyButton.onclick = function addToBasket(){
                    //Create a "li" HTML element for every transaction
                    const transaction = document.createElement("li")
                    transaction.className = "transactions"

                    //Check if the product is in stock.
                    if(productItem.stock >= 1){
                        //If in stock, add its price to the "total" variable
                        total += productItem.price
                        
                        /* Add the transaction's description to the innerHTML of the "transaction" "li" 
                        and append the "li" to the "basketContents" div */
                        transaction.innerHTML = `${productItem.name} - ${productItem.price} kr`
                        basketContents.appendChild(transaction)    
                        
                        //Render the "total" variable with updated value
                        totalH3.innerHTML = `Total: ${total} kr`

                        //Reduce the product's "stock" value by 1 and change its stock.innerText
                        productItem.stock--
                        stock.innerText = `Units in Stock: ${productItem.stock}`

                    } else{
                        alert("This product is out of stock!")
                    }

                }//end of addToBasket()


                //---------Assign the image HTML element its alt-attribute---------
                //4. Image måste ha alt-attributet satt
                
                //Create variable "imgAlt" that contains alt image value
                const imgAlt = productItem.images[0].alt

                //Assign corresponding alt value to imgSrc HTML element
                imgSrc.setAttribute("alt", imgAlt)
                
                //end of image alt-attribute code
                

                //---------addToBasketViaImage()---------
                 //5. När man klickar på en bild så ska totalen uppdateras. 
                 //6. När man klickar på en bild så ska varan läggas till i ens varukorg.
                imgSrc.onclick = function addToBasketViaImage(){
                    //Create a "li" HTML element for every transaction
                    const transaction = document.createElement("li")
                    
                    //Check if the product is in stock.
                    if(productItem.stock >= 1){
                        //If in stock, add to total
                        total += productItem.price
                        
                        /* Add the transaction's description to the innerHTML of the "transacition" "li" 
                        and append the "li" to the "basketContents" div */
                        transaction.innerHTML = `${productItem.name} - ${productItem.price}`
                        basketContents.appendChild(transaction)    
                        
                        //Render the "total" variable with updated value
                        totalH3.innerHTML = `Total: ${total}`

                        //Reduce the product's "stock" value by 1 and change its stock.innerText
                        productItem.stock--
                        stock.innerText = `Units in Stock: ${productItem.stock}`

                    } else{
                        alert("This product is out of stock!")
                    }
                }//end of addToBasketViaImage()
                
                
                //---------Append HTML elements---------
                const productDiv = document.createElement("div")
                productDiv.setAttribute("id", "productDiv")
                productDiv.className = "card"
                productDiv.style.width = "20rem" 
                
                //Append Image
                imgSrc.className = "card-img-top"
                productDiv.appendChild(imgSrc)
                
                //Create div Card body
                let cardBody = document.createElement("div")
                cardBody.className = "card-body"
                
                
                //Add card title (h5); add class "card-title" (name)
                name.className = "card-title"
                name.style.textAlign = "center";
                cardBody.appendChild(name)
                
                //Add a hr to the card, under the product tile
                cardBody.appendChild(hr)
                
                //Add description
                description.className = "card-text"
                cardBody.appendChild(description)
                
                cardBody.appendChild(price)
                cardBody.appendChild(rating)
                cardBody.appendChild(stock)
                cardBody.appendChild(buyButton)
                
                //Append cardBody to productDiv
                productDiv.appendChild(cardBody)
                
                //Add margin between cards
                productDiv.style.margin = "10px"


                //---------Append productDiv to productsContainer div---------
                productsContainer.appendChild(productDiv)
                
            }//end of renderProductItem(productItem)



            //-----------------renderProductList(productsContainer)----------------------------
            function renderProductList(productsContainer){
                productsContainer.forEach(producItem => {
                    renderProductItem(producItem)
                })
            }//end of renderProductList(productsContainer)

            

            //-----------------fetch(url)----------------------------
            fetch(url)
            .then(response => response.json())
            .then(data => {
                   renderProductList(data) 
            })//end of fetch(url)