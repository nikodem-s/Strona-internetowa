let galleryImages = document.querySelectorAll(".gallery-img"); //wybieram elementy, ktore maja jakas konretna klase
let getLatestOpened;
let windowWidth = window.innerWidth; //cala szerokosc naszego ekranu

if (galleryImages) {
    galleryImages.forEach(function(image, index) { //ta zmienna ma wszystkie zdj //index liczy index tej tablicy
        image.onclick = function() {
            //alert("witam"); //wchodze do kazdego elementu skladajacego sie na ta galerie i wykonuje ponizsze:
            let getImageStyle = window.getComputedStyle(image); //biore css kazdego pojedynczego elementu 
            let getFullImage = getImageStyle.getPropertyValue("background-image"); //na tym mi zalezy, bo chce na full ekran dac 
            let getImgPosition = getFullImage.split("/images/thumbnails"); // rozdziela tego poprzedniego       //pelnej rozdzielczosci obrazki
            let newUrl1 = getImgPosition[1].replace('")', '');
            let newUrl = newUrl1.replace('/', '');
            //alert(newUrl); //mamy nazwe naszego zdj - dzieki zastepnowaniu i wczytywaniu
            getLatestOpened = index + 1;

            //nasz pop-up

            let kontener = document.body;
            let newWindow = document.createElement("div");
            kontener.appendChild(newWindow); //tworze jakby pustego diva, takiego ze bedzie sie otwieralo na calosc.
            newWindow.setAttribute("class", "img-window"); //do tego new window, ktory jest moim divem - daje clase .img-window
            newWindow.setAttribute("onclick", "closeImg()"); //dodaje do tego diva tez onclick z funckja, ktora zamyka ten obrazek

            let bigImg = document.createElement("img");
            newWindow.appendChild(bigImg);
            bigImg.setAttribute("src", "images/" + newUrl); //daje source, do pelnej jakosci zdjec
            bigImg.setAttribute("id", "current"); //daje id, zeby wiedziec jakie obecne zdj jest otwarte
            bigImg.onload = function() { //czeka na pojawienie sie az, to zdj sie zaladuje

                let img_width = this.width;
                let calcToEdge = (windowWidth - img_width) / 2 - 80; //dzieki temu przyciski beda centralnie przy zdjeciu
                let backButton = document.createElement("a"); //tworze element a - dla przycisku zeby mogl byc na nim text
                let backText = document.createTextNode("Back") //po prostu text jaki ma miec ten przycisk
                backButton.appendChild(backText); //dodanie wlasnie tego textu do a         
                kontener.appendChild(backButton); //do ciala mojej strony dodaje puste <a></a> ktore sa moimi przyciskami 
                backButton.setAttribute("class", "img-back-button"); //ustawiam klase dla tego przycisku czyli jest cos w stylu <a class = "img-back-button"></a>
                backButton.setAttribute("onclick", "changeImg(0)"); //usatwiam atrybut co sie dzieje kiedy klikam na ten przycisk - w tym przypadku funkcja do zmieniania
                backButton.style.cssText = "left: " + calcToEdge + "px;"; //ustawienie przycisku w taki sposob, zeby estetycznie to wygladalo
                //next przycisk
                let nextButton = document.createElement("a"); //analogicznie robie jak w przycisku wyzej
                let nextText = document.createTextNode("Next")
                nextButton.appendChild(nextText);
                kontener.appendChild(nextButton);
                nextButton.setAttribute("class", "img-next-button");
                nextButton.setAttribute("onclick", "changeImg(1)");
                nextButton.style.cssText = "right: " + calcToEdge + "px;";
            }


        }

    });
}

function closeImg() {
    document.querySelector(".img-window").remove(); //klikam i sie usuwa, zdjecie to pelnej rozdzielczosci tez sie usuwa
    document.querySelector(".img-back-button").remove();
    document.querySelector(".img-next-button").remove(); //analogicznie jak to najwyzsze, ale dla przyciyskow
}

function changeImg(direction) {
    document.querySelector("#current").remove(); //dzieki temu ze mam id current, to moge usunac obecnie otwarte zdj, zeby sie zamknelo

    let getImgWindow = document.querySelector(".img-window"); //wybieram wszystko zwiazane z klasa .img-window
    let newImg = document.createElement("img"); // tworze element img
    getImgWindow.appendChild(newImg); //dodaje go wlasnie do miejsc gdzie mam .img-window

    let calcnewImg;
    if (direction === 1) {
        calcnewImg = getLatestOpened + 1; //zeby otworzyc kolejne, ktore jest za ostatnio otwartym
        if (calcnewImg > galleryImages.length) {
            calcnewImg = 1; //jesli dojde do ostatniego zdj to zeby nie bylo bledow zrobilem tak, ze znowu idzie od smaego poczatku
        }
    } else if (direction === 0) {
        calcnewImg = getLatestOpened - 1;
        if (calcnewImg < 1) {
            calcnewImg = galleryImages.length; //zeby otworzyc ostatnie zdj w kolejnosci czyli img7 
        }
    }
    newImg.setAttribute("src", "images/img" + calcnewImg + ".jpg"); //ustawiam sciezke do tego naszego obrazka nowego, ktory chce otworzyc
    newImg.setAttribute("id", "current");
    getLatestOpened = calcnewImg;
    // mozesz sobie sprobowac Kacper bez tej funkcji onload i zoabczysz po co ona jes ;d
    newImg.onload = function() {
        let imgWidth = this.width;
        let calcButtonstoEdge = ((windowWidth - imgWidth) / 2) - 80; //licze szerokosc tego zdj co sie obecnie zaladowuje

        let nextBtn = document.querySelector(".img-next-button"); //znowu wybieram wszytsko co jest zwiazane z ta klasa
        nextBtn.style.cssText = "right: " + calcButtonstoEdge + "px;"; //dodaje do jego stylu przesuniecie, tak zeby dopasowac do nowego zdj

        let backBtn = document.querySelector(".img-back-button"); //znowu wybieram wszytsko co jest zwiazane z ta klasa
        backBtn.style.cssText = "left: " + calcButtonstoEdge + "px;";
    }
}