<template>
  <div :class="[
    appview ? 'bg-white h-screen overflow-y-auto' : 'bg-neas-new-green', 
    desktopview ? 'bg-white h-full overflow-hidden' : !appview ? 'bg-neas-new-green h-screen overflow-y-auto' : '', 
    'font-mabry'
  ]">

    <!-- Show loader -->
    <div v-if="isLoading && !showErrorMessage" :class="[appview ? 'bg-white' : 'bg-neas-new-green', 'fixed bg-neas-new-green inset-0 flex items-center justify-center']" >
      <div class="grid grid-rows-3 grid-flow-col gap-4">
        <div class="font-mabry">
          <img v-if="(!appview)" class="mx-auto h-32 md:h-40 w-auto rotate text-center" src="../assets/neas-new-loader-small.gif" />
        </div>
        <div>  
            <p v-if="!appview && loaderMessage != null" :class="[appview ? 'text-neas-new-green' : 'text-white', 'mt-3 mx-auto text-center text-xl sm:text-2xl md:text-3xl md:font-medium']">
              {{ loaderMessage }}
            </p>
            <p class="mt-6 mx-auto text-center">
           
            </p>   
          </div>
      </div>
      <div class="fixed bottom-0 left-0 w-full">
        <img v-if="!appview" class="bottom-0 mb-12 mx-auto h-8 md:h-10 w-auto" src="../assets/neas-new-logo-white.svg" />
      </div>
    </div>

    <!-- Show error -->
    <div v-if="!isLoading && showErrorMessage" class="pb-24 p-6 fixed bg-neas-new-green inset-0 flex items-center justify-center">
      <div class="">
        <img class="mx-auto h-24 sm:h-32 w-auto text-center" src="../assets/neas-loader-new.png" />
        <p class="mt-8 mx-auto text-center text-xl sm:text-2xl font-medium text-white">
          {{ loaderMessage }}
        </p>
        <p v-if="errorMessage == null" class="mt-6 mb-6 text-center justify-center items-center font-mabry mx-auto text-base sm:text-lg text-white">
          Vennligst prøv igjen senere, eller <a class=" text-white underline" href="https://neas.no/kontaktsenter/">ta kontakt </a> for hjelp.
        </p>
        <p v-if="errorMessage != null" class="flex mt-6 mb-6 text-center justify-center items-center font-mabry mx-auto text-base sm:text-lg text-white">
          {{ errorMessage }}
        </p>
        <div class="flex justify-center"> 
           <button @click="goHomepage" class="ml-2 mr-2 text-base sm:text-lg rounded-full border-0 py-3 px-4 bg-neas-new-lightgreen text-neas-new-green hover:bg-neas-new-lightgreen-90 ">Tilbake til neas.no -></button>
        </div>
      </div>
      <div class="fixed bottom-0 left-0 w-full">
        <img class="bottom-0 mb-12 mx-auto h-8 md:h-10 w-auto" src="../assets/neas-new-logo-white.svg" />
      </div>
    </div>

    <!-- Header Desktop -->
    <header v-if="!isLoading && !showErrorMessage && !appview && !desktopview" class="sm:pt-10 mb-4 max-w-6xl sm:block mx-auto" >
      <div class="sm:pl-4 sm:pr-4 mx-auto grid grid-cols-1 sm:grid-cols-12 ">
        <div class="col-span-1 sm:col-span-3">
          <img @click="goBack()" class="mx-auto cursor-pointer sm:float-left mt-2 mb-1 sm:mb-0 sm:mt-1.5 h-8 md:h-9 w-auto" src="../assets/neas-new-logo-white.svg"/>
        </div>
        <div class="hidden sm:block col-span-1 sm:col-span-6">
          <!-- Changed title from "Bestill strøm" to "Bestill internett" -->
          <p class="mt-2 text-xl sm:text-2xl font-medium text-white text-center">Norgespris</p>
        </div>
        <div class="hidden sm:block col-span-1 sm:col-span-3">
          <!-- Login button and account dropdown remain unchanged -->
          <button v-if="token == null && !showError" @click="goLogin()" class="mt-1 mb-2 float-right p-2 flex justify-center rounded-full bg-neas-new-lightgreen text-lg text-neas-new-green px-5 py-2 ">Logg inn -></button>
          <Menu v-if="token != null && !showError" as="div" class="ml-4 float-right relative inline-block text-left">
            <div>
              <MenuButton class="inline-flex w-full justify-center rounded-md text-base font-medium text-neas-new-green hover:outline-none focus:outline-none">
                <a class="float-right font-bold">
                  <button type="button" class="inline-flex items-center text-base font-medium rounded-md text-neas-new-green "> 
                    <span class="inline-block h-11 w-11 overflow-hidden rounded-full bg-gray-100 ring-2 ring-transparent ring-offset-1 hover:ring-neas-green focus:ring-neas-green">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user p-2 h-full text-neas-new-green">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </span>
                  </button>
                </a> 
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-neas-green ring-opacity-5  focus:outline-none">
                <div class="">
                  <div class="">
                    <MenuItem v-slot="{ active }">
                      <p :class="[active ? 'cursor-default  text-neas-new-green' : 'text-neas-new-green', 'rounded-md block w-full px-4 py-2 text-left text-base font-mabry']">
                        <span class="text-sm text-gray-400">Logget inn som</span>
                        <br>
                        {{ account.displayName }} 
                      </p>
                    </MenuItem>
                    <div class="border-t">


                    <!-- Locations -->
                    <div v-if="locations.length && locations.length >= 0" class="hidden md:block float-right  ">
                        
                        <select
                                @change="changeLocation()"
                                v-model="selectedLocation"
                                class="mx-auto text-base font-medium block rounded-lg border-0 py-2.5 bg-gray-100 text-neas-new-green ring-2 ring-inset ring-gray-100 hover:ring-neas-green focus:ring-2 focus:ring-offset-1 focus:ring-neas-new-green"
                            >
                        
                                <option
                                v-for="(location, index) in locations"
                                :key="location.id"
                                :value="location"
                                :class="{ 'p-2 text-neas-new-green text-base font-medium': location.id === selectedLocation.id }">
                                {{ location.address }}
                                </option>

                            </select>
                    </div>


                    </div>
                    <MenuItem v-slot="{ active }">
                      <button @click="goBack()" :class="[active ? 'bg-gray-100 text-neas-new-green' : 'text-neas-new-green', 'rounded-md block w-full px-4 py-2 text-left text-base font-mabry']">Gå til Min side</button>
                    </MenuItem>
                  </div>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </header>

    <!--  -->
    <!-- Information about Norgespris -->
    <!--  -->
    <div v-if="!isLoading && !showErrorMessage" class="md:block max-w-6xl mx-auto font-mabry ">
      
      
      <!-- Main steps -->
      <div class="bg-white rounded-xl p-3 pb-6 sm:p-6 sm:pb-3">

        <div class="bg-neas-new-green p-4 sm:p-6 rounded-xl">

            <!-- Grid with two columns -->

            <div class="grid grid-cols-1 sm:grid-cols-8 gap-4">

                <div class="col-span-3">
                    <img class="mb-3 md:max-h-[500px] w-auto text-center" src="../assets/neas-new-easter-greeting.png" alt=""/>
                </div>

                <div class="col-span-5">

                    <p class="text-base sm:text-3xl font-medium text-white">Hva er Norgespris?</p>
                    <p class="mt-1 text-base sm:text-lg text-white">Norgespris blir et alternativ til dagens strømstøtteordning med du en fast strømpris på 50 øre/kWh (inkl. mva) - hjemme og på hytta.</p>

                    <ul class="mt-4 ml-2 list-disc list-inside space-y-1 text-base sm:text-lg text-white">
                        <li>Statlig støtteordning – alternativ til dagens strømstøtteordning</li>
                        <li>Fast strømpris hver time hele året (50 øre/kWh inkl. mva)</li>
                        <li>Du beholder strømavtalen din</li>
                        <li>Følger målepunktet og har bindingstid*</li>
                        
                    </ul>

                    <p class="mt-4 italic sm:text-base text-white">Gjelder månedsforbruk opptil 5000 kWh i privathusholdning og 1000 kWh i fritidsbolig. Kan bestilles i slutten av september.</p>

                </div>

            </div>

        </div>

        <!--  -->
        <!-- Energy consumption and calculator -->
        <!--  -->

        <div class="mt-6">
          <p class="ml-3 text-xl sm:text-2xl text-neas-new-green font-medium">Bør jeg velge Norgespris?</p>
          <p class="sm:mb-4 p-3 text-base sm:text-lg">
           Her kommer det kalkulator og pris eksempler
          </p>     


                <!-- Consumption History -->
                <div class="p-4 sm:p-6 col-span-1 md:col-span-12 bg-neas-new-gray rounded-xl ">
                <div class=" bg-neas-new-gray rounded-xl">



                    <!-- Spotprice Chart (History) -->
                    <div>
         
                    <p class="mb-6 text-lg md:text-xl text-neas-new-green">
                        Spotpris historikk
                    </p>
                        <!-- <highcharts class="sm:p-4" type="stockChart" :options="spotHistoryChart" :redrawOnUpdate="true" :oneToOneUpdate="true" :animateOnUpdate="true" /> -->
                    </div>
  

                </div>
        </div>

        <!--  -->

        </div>


          <!-- Info: Bindingstid og forbruksgrenser -->
          <div class="mb-6 p-6 bg-neas-new-gray rounded-xl">
            <p class="text-lg sm:text-xl font-medium text-neas-new-green mb-2">Bindingstid og forbruksgrenser</p>
            <p class="text-base sm:text-lg mb-3">
              Norgespris kan etter planen bestilles mot slutten av september. Bestilling skjer digitalt via Elhub når løsningen åpner. Får du ikke bestilt digitalt kontakter du nettselskapet ditt. Strømavtalen du allerede har hos kraftleverandøren videreføres uendret.
            </p>
            <p class="text-base sm:text-lg mb-3">
              Har kraftleverandøren gjennomfakturering får du strøm, nettleie og støtte (inkludert Norgespris) samlet på én faktura. Uten gjennomfakturering mottar du separate fakturaer.
            </p>
            <p class="text-base sm:text-lg mb-3">
              Første avtaleperiode gjelder fra 1. oktober 2025 til og med 31. desember 2026. Bestiller du senere i perioden, gjelder avtalen ut 2026. Fra 2027 fastsettes nytt prisnivå og binding per kalenderår. Avtalen er knyttet til målepunktet; ved eierskifte eller ny leietaker følger gjenværende binding med.
            </p>
            <p class="text-base sm:text-lg mb-1">
              Forbrukstak: Både dagens strømstøtte og Norgespris dekker inntil <strong>5&nbsp;000 kWh per måned</strong> per målepunkt i bolig. For hytte/fritidsbolig dekker Norgespris inntil <strong>1&nbsp;000 kWh per måned</strong>. (Fjernvarme har tilsvarende rammer der det er relevant.)
            </p>

          </div>


        <!-- Feedback score -->

                        <!-- Feedback -->
                <div v-if="!isLoading && !hideFeedback" class="mt-3 mb-2 sm:mb-2 h-full text-base text-white overflow-hidden">

                    <!-- Feedback form -->

                    <div class="col-span-2 ">
                        <canvas ref="confettiCanvas" class="confetti-canvas"></canvas>

                        <p v-if="!feedbackScoreSubmitted" class="text-base sm:text-lg font-medium">
                            Hvordan er du fornøyd med dine tjenester fra Neas?
                        </p>

                        <!-- Rating -->
                        <div v-if="!feedbackScoreSubmitted" class="mt-2 flex items-center cursor-pointer">
                            <template v-for="star in 6" :key="star">
                                <SolidStar
                                v-if="star <= (hoveredStar || feedbackScore)"
                                class="w-8 h-8 mr-1 text-yellow-400 hover:text-yellow-500"
                                @click="!feedbackScoreSubmitted && sendCustomerFeedback(star)"
                                @mouseover="hoveredStar = star"
                                @mouseleave="hoveredStar = 0"
                                />
                                <OutlineStar
                                v-else
                                class="w-8 h-8 mr-1 text-white hover:text-yellow-400"
                                @click="!feedbackScoreSubmitted && sendCustomerFeedback(star)"
                                @mouseover="hoveredStar = star"
                                @mouseleave="hoveredStar = 0"
                                />
                            </template>
                            </div>


                        <!-- Thank You Message and feedback form if score is under 4 -->
                        <div v-if="feedbackScoreSubmitted" class="mt-6">
                            <p v-if="feedbackScore <= 4" class="text-lg md:text-xl md:font-medium">Takk for din tilbakemelding!</p>
                            <p v-if="feedbackScore >= 5" class="text-lg md:text-xl md:font-medium">
                            Takk for din tilbakemelding! <span class="text-red-500">&#10084;</span>
                            </p>
                            <p v-if="showFeedbackForm" class="mt-3 text-base sm:text-lg">Send oss gjerne en kommentar:</p>

                            <!-- Feedback form -->
                            <div v-if="showFeedbackForm" class="mt-1">
                            <textarea
                                v-model="feedbackComment"
                                class="w-full h-40 p-3 border text-base sm:text-lg text-neas-new-green border-gray-300 rounded-md focus:border-neas-new-green focus:ring-neas-new-green"
                                placeholder="Din tilbakemelding"
                            ></textarea>
                            <button
                                @click="sendCustomerFeedback(this.feedbackScore)"
                                class="mt-3 mb-6 p-6 flex justify-center rounded-full bg-neas-new-yellow px-4 py-3.5 text-base md:text-lg text-neas-new-green "
                            >
                                Send tilbakemelding ->
                            </button>
                            </div>
                        </div>
                    </div>

                </div>


        <!-- FAQ  -->
        <div class="mt-8 mb-6 flex flex-col bg-neas-new-gray rounded-xl sm:rounded-lg p-4 sm:p-6">

           
          <!-- Norgespris FAQ (paraphrased) -->
          <div class=" bg-neas-new-gray">
            <p class="text-xl text-neas-new-green font-medium mb-4">Spørsmål og svar om Norgespris</p>

            <details class="mt-1 group mb-2">
              <summary class="flex sm:items-center sm:justify-between cursor-pointer list-none">
                <span class="font-medium text-base sm:text-lg group-open:font-semibold">Hvorfor innføres Norgespris?</span>
                <div class="hidden sm:block"><span class="group-open:hidden text-2xl">+</span><span class="hidden group-open:inline text-2xl">–</span></div>
              </summary>
              <div class="mt-3 mb-4 text-base sm:text-lg">
                Ordningen skal gi husholdninger og fritidsboliger en mer forutsigbar strømregning. Staten dekker forskjellen mellom markedspris (spot) og fast nivå (40 øre/kWh eks. mva.) for de som velger ordningen – på samme måte som dagens støtte dekker deler av høye spotpriser.
              </div>
            </details>

            <details class="mt-1 group mb-2">
              <summary class="flex sm:items-center sm:justify-between cursor-pointer list-none">
                <span class="font-medium text-base sm:text-lg group-open:font-semibold">Hvorfor akkurat 40 øre?</span>
                <div class="hidden sm:block"><span class="group-open:hidden text-2xl">+</span><span class="hidden group-open:inline text-2xl">–</span></div>
              </summary>
              <div class="mt-3 mb-4 text-base sm:text-lg">
                Nivået bygger på gjennomsnittlige inflasjonsjusterte kraftpriser før energikrisen (ca. 2010–midten av 2021) og vurderinger av forventet prisnivå fremover.
              </div>
            </details>

            <details class="mt-1 group mb-2">
              <summary class="flex sm:items-center sm:justify-between cursor-pointer list-none">
                <span class="font-medium text-base sm:text-lg group-open:font-semibold">Hva skjer med dagens strømstøtte?</span>
                <div class="hidden sm:block"><span class="group-open:hidden text-2xl">+</span><span class="hidden group-open:inline text-2xl">–</span></div>
              </summary>
              <div class="mt-3 mb-4 text-base sm:text-lg">
                Strømstønadsordningen fortsetter uendret. Du kan selv velge – Norgespris kan brukes hjemme og på hytta, mens dagens støtte gjelder bare boligen. Man kan kombinere (f.eks. støtte hjemme, Norgespris på hytta).
              </div>
            </details>

            <details class="mt-1 group mb-2">
              <summary class="flex sm:items-center sm:justify-between cursor-pointer list-none">
                <span class="font-medium text-base sm:text-lg group-open:font-semibold">Kan jeg angre eller bytte tilbake?</span>
                <div class="hidden sm:block"><span class="group-open:hidden text-2xl">+</span><span class="hidden group-open:inline text-2xl">–</span></div>
              </summary>
              <div class="mt-3 mb-4 text-base sm:text-lg">
                Bestiller du mellom 1.10.2025 og 31.12.2026 er du bundet ut 2026. Fra 2027 varer bindingen fra bestilling til 31.12 samme år. Du kan avbestille innen 14 dager (angrefrist). For fjernvarme starter avtalen første dag i neste måned.
              </div>
            </details>

            <details class="mt-1 group mb-2">
              <summary class="flex sm:items-center sm:justify-between cursor-pointer list-none">
                <span class="font-medium text-base sm:text-lg group-open:font-semibold">Hva hvis jeg flytter?</span>
                <div class="hidden sm:block"><span class="group-open:hidden text-2xl">+</span><span class="hidden group-open:inline text-2xl">–</span></div>
              </summary>
              <div class="mt-3 mb-4 text-base sm:text-lg">
                Norgespris knyttes til målepunktet (anlegget). Ny eier/leietaker overtar bindingen ut gjeldende periode.
              </div>
            </details>

            <details class="mt-1 group mb-2">
              <summary class="flex sm:items-center sm:justify-between cursor-pointer list-none">
                <span class="font-medium text-base sm:text-lg group-open:font-semibold">Hva lønner seg – støtte eller Norgespris?</span>
                <div class="hidden sm:block"><span class="group-open:hidden text-2xl">+</span><span class="hidden group-open:inline text-2xl">–</span></div>
              </summary>
              <div class="mt-3 mb-4 text-base sm:text-lg">
                Det avhenger av fremtidig spotpris som ingen kjenner sikkert. Støtten skjermer mot toppene, mens Norgespris gir stabilitet hver time. Ønsker du forutsigbarhet fremfor variasjon, kan Norgespris passe.
              </div>
            </details>

            <details class="mt-1 group mb-2">
              <summary class="flex sm:items-center sm:justify-between cursor-pointer list-none">
                <span class="font-medium text-base sm:text-lg group-open:font-semibold">Minker insentivet til å spare strøm?</span>
                <div class="hidden sm:block"><span class="group-open:hidden text-2xl">+</span><span class="hidden group-open:inline text-2xl">–</span></div>
              </summary>
              <div class="mt-3 mb-4 text-base sm:text-lg">
                Sparing lønner seg fortsatt – du betaler for hvert kWh du ikke unngår. Nettleiestruktur og effektinsentiver består, og lavere forbruk gir lavere regning uansett ordning.
              </div>
            </details>

            <details class="mt-1 group mb-2">
              <summary class="flex sm:items-center sm:justify-between cursor-pointer list-none">
                <span class="font-medium text-base sm:text-lg group-open:font-semibold">Hvor mye forbruk dekkes?</span>
                <div class="hidden sm:block"><span class="group-open:hidden text-2xl">+</span><span class="hidden group-open:inline text-2xl">–</span></div>
              </summary>
              <div class="mt-3 mb-4 text-base sm:text-lg">
                Bolig: inntil 5&nbsp;000 kWh/mnd per målepunkt (fjernvarme 4&nbsp;500 kWh). Fritidsbolig: inntil 1&nbsp;000 kWh/mnd. Boligselskaper: 5&nbsp;000 kWh per boenhet og 1&nbsp;000 kWh per fritidsboligenhet.
              </div>
            </details>

            <details class="mt-1 group mb-2">
              <summary class="flex sm:items-center sm:justify-between cursor-pointer list-none">
                <span class="font-medium text-base sm:text-lg group-open:font-semibold">Kommer det tillegg utover 40 øre?</span>
                <div class="hidden sm:block"><span class="group-open:hidden text-2xl">+</span><span class="hidden group-open:inline text-2xl">–</span></div>
              </summary>
              <div class="mt-3 mb-4 text-base sm:text-lg">
                Ja. Nettleie, offentlige avgifter (elavgift, Enova, mva.) og eventuelle påslag i din kraftavtale kommer i tillegg.
              </div>
            </details>

            <details class="mt-1 group mb-2">
              <summary class="flex sm:items-center sm:justify-between cursor-pointer list-none">
                <span class="font-medium text-base sm:text-lg group-open:font-semibold">Inneholder 40 øre påslag til kraftleverandør?</span>
                <div class="hidden sm:block"><span class="group-open:hidden text-2xl">+</span><span class="hidden group-open:inline text-2xl">–</span></div>
              </summary>
              <div class="mt-3 mb-4 text-base sm:text-lg">
                Nei, det er ikke en vanlig fastprisavtale. Du må fortsatt ha en separat strømavtale, og totale kostnader inkluderer den avtalens påslag + nettleie + avgifter.
              </div>
            </details>

            <details class="mt-1 group mb-2">
              <summary class="flex sm:items-center sm:justify-between cursor-pointer list-none">
                <span class="font-medium text-base sm:text-lg group-open:font-semibold">Hvem administrerer ordningen?</span>
                <div class="hidden sm:block"><span class="group-open:hidden text-2xl">+</span><span class="hidden group-open:inline text-2xl">–</span></div>
              </summary>
              <div class="mt-3 mb-4 text-base sm:text-lg">
                Staten finansierer; lokale nett- og fjernvarmeselskaper håndterer gjennomføringen. Du beholder forholdet til ditt strømsalgselskap.
              </div>
            </details>

            <details class="mt-1 group mb-2">
              <summary class="flex sm:items-center sm:justify-between cursor-pointer list-none">
                <span class="font-medium text-base sm:text-lg group-open:font-semibold">Når og hvor kan jeg bestille?</span>
                <div class="hidden sm:block"><span class="group-open:hidden text-2xl">+</span><span class="hidden group-open:inline text-2xl">–</span></div>
              </summary>
              <div class="mt-3 mb-4 text-base sm:text-lg">
                Planlagt oppstart 1. oktober 2025. Myndighetene varsler kanal og tidspunkt i forkant slik at du kan bestille i god tid.
              </div>
            </details>

            <details class="mt-1 group mb-2">
              <summary class="flex sm:items-center sm:justify-between cursor-pointer list-none">
                <span class="font-medium text-base sm:text-lg group-open:font-semibold">Hvor lenge varer Norgespris?</span>
                <div class="hidden sm:block"><span class="group-open:hidden text-2xl">+</span><span class="hidden group-open:inline text-2xl">–</span></div>
              </summary>
              <div class="mt-3 mb-4 text-base sm:text-lg">
                Vedtatt å gjelde (sammen med dagens støtteordning) frem til 31. desember 2029, med prisjustering planlagt 1. januar 2027.
              </div>
            </details>

            <details class="mt-1 group mb-2">
              <summary class="flex sm:items-center sm:justify-between cursor-pointer list-none">
                <span class="font-medium text-base sm:text-lg group-open:font-semibold">Hva koster ordningen staten?</span>
                <div class="hidden sm:block"><span class="group-open:hidden text-2xl">+</span><span class="hidden group-open:inline text-2xl">–</span></div>
              </summary>
              <div class="mt-3 mb-4 text-base sm:text-lg">
                Bevilgningen i revidert nasjonalbudsjett 2025 er om lag 1,265 mrd. kroner. Faktisk kostnad avhenger av fremtidige kraftpriser, forbruk og hvor mange som velger ordningen.
              </div>
            </details>
          </div>

          <p class="mt-3 mb-3 text-base sm:text-lg"> Mer informasjon om Norgespris finner du på <a href="https://neas.no/norgespris/" class="text-neas-new-green underline" target="_blank" rel="noopener noreferrer">denne siden</a>.</p>

        </div>


      </div>


    </div>
 

    <!-- Footer -->
    <div v-if="!isLoading" class="mt-4 mb-4 sm:mt-6 sm:mb-6 pb-36 sm:pb-24 w-full justify-center">
      <!-- <p class="font-mabry text-center text-white">© {{ $dayjs().format('YYYY') }} Neas Energi Telekom AS</p> -->
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import _ from 'underscore';


import { Chart } from 'highcharts-vue';
import HighCharts from 'highcharts';

import Boost from 'highcharts/modules/boost';
import Accessibility from 'highcharts/modules/accessibility';
import StockCharts from 'highcharts/modules/stock';
import Exporting from 'highcharts/modules/exporting';
import ExportData from 'highcharts/modules/export-data';

import {
  ChevronUpIcon,
  ChevronRightIcon,
  ShieldCheckIcon,
  MagnifyingGlassIcon,
  HomeIcon,
  XMarkIcon,
  CheckCircleIcon 
} from '@heroicons/vue/24/outline';

import { PhLightbulb, PhWifiHigh, PhMonitorPlay, PhFilePdf, PhFileText, PhCheckCircle, PhCheck, PhX, PhInfo, PhGoogleChromeLogo, PhIceCream } from "@phosphor-icons/vue";
import { RadioGroup, RadioGroupOption, Switch, SwitchGroup, SwitchLabel, Menu, MenuButton, MenuItem, MenuItems, Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

import dayjs from 'dayjs';

export default {
  name: 'Norgespris',
  components: {
    HighCharts,
    Highcharts: Chart,
    ChevronUpIcon,
    ChevronRightIcon,
    ShieldCheckIcon,
    MagnifyingGlassIcon,
    HomeIcon,
    XMarkIcon,
    CheckCircleIcon,
    PhCheckCircle,
    PhLightbulb,
    PhWifiHigh,
    PhMonitorPlay,
    PhFilePdf,
    PhCheck,
    PhFileText,
    PhInfo,
    PhX,
    RadioGroup,
    RadioGroupOption,
    Switch,
    SwitchGroup,
    SwitchLabel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot
  },
  data() {
    return {      


      // Spotprice
      spotHistory: [],
      spotHistoryDay: {},
      spotToday: [],
      spotNextDay: [],
      priceArea: 'NO3',
      priceAreas: [
          {
              id: 'NO1',
              description: 'NO1 (Østlandet)'
          },
          {
              id: 'NO2',
              description: 'NO2 (Sørlandet)'
          },
          {
              id: 'NO3',
              description: 'NO3 (Midt-Norge)'
          },
          {
              id: 'NO4',
              description: 'NO4 (Nord-Norge)'
          },
          {
              id: 'NO5',
              description: 'NO5 (Vestlandet)'
          },
      ],

       //
       // Spotprice Chart (History)
       //

       spotHistoryChart: {
            chart: {
                type: 'area',  // Change to 'area' to enable filling
                //height: "600px",
                backgroundColor: '#f1f6f5',
                style: {
                    fontFamily: 'Mabry, sans-serif' // Use your custom font here
                },
            },
            navigator: {
                adaptToUpdatedData:true,
                enabled: true,
                height: 80
            },
            boost: {
                enabled: true
            },
            legend: {
                accessibility: {
                    enabled: false
                },
                align: "left",
                layout: 'horizontal',
                verticalAlign: 'bottom',
                enabled: false
            },
            plotOptions: {
                series: {
                    marker: {
                        enabled: false
                    },
                    step: 'left',
                    lineWidth: 2,
                    showInNavigator: true
                }
            },
            loading: {
                hideDuration: 50,
                showDuration: 50
            },
            title: false,  // Set title to false since it's set to 'true' inappropriately
            xAxis: {
                title: {
                    text: false,
                },
                currentDateIndicator: true,
                crosshair: {
                    color: "#003d2d",
                    lineWidth: 1,
                },
                ordinal: true,
                type: 'datetime',
                labels: {
                    format: '{value: %b %y}',
                    style: {
                        fontSize: '16px',
                        color: '#385d76',
                        fontWeight: 'medium'
                    }
                },
                dateTimeLabelFormats: {
                    millisecond: '%H:%M:%S.%L',
                    second: '%H:%M:%S',
                    minute: '%H:%M',
                    hour: '%H:%M',
                    day: '%e. %b',
                    week: '%e. %b',
                    month: '%b \'%y',
                    year: '%Y'
                },
            },
            yAxis: {
                title: {
                    text: '',
                    style: {
                        fontSize: '14px',
                        color: '#385d76',
                        fontWeight: 'medium',
                    }
                },
                labels: {
                    style: {
                        fontSize: '16px',
                        color: '#385d76',
                        fontWeight: 'medium'
                    }
                },
                plotLines: [
                    {
                        value: 0,
                        color: '#385d76',
                        width: 1,
                        zIndex: 0,
                    }
                ],
                min: 0,
                //maxPadding: 0.05,
                //tickInterval: 50,
                //tickLength: 5,
                //StickWidth: 0.5,
                tickColor: '#b3b3b3',
                lineWidth: 1,
                lineColor: '#b3b3b3',
                gridLineColor: '#e6e6e6',
            },
            colors: ['#95c672'],
            tooltip: {
                shape: 'rect',
                shared: true,
                headerFormat: '<span style="font: Mabry; font-size: 16px;color:#003d2d">{point.x: %e. %B %Y}</span><br>',
                pointFormat: '<span style="font: Mabry; font-size: 16px;color:#003d2d"><b>{point.y}</span></b><br>',
                valueSuffix: ' øre/kWh',
                backgroundColor: '#ffffff',
                style: {
                    color: '#003d2d',
                    fontSize: '16px'
                }
            },
            series: [{
                name: "Spotpris",
                type: 'area',  // Ensure the series type is 'area'
                lineWidth: 1,
                visible: true,
                data: [], 
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        x2: 0,
                        y1: 0,
                        y2: 1
                    },
                    stops: [
                        [0, '#cdeac9'],
                        //[1, 'rgba(34, 83, 91, 0.5)'], 
                        //[2, 'rgba(34, 83, 91, 0.3)'],
                        //[3, '#cdeac9'],
                    ], 
                },
                point: {
                events: {
                    mouseOver: function () {
                        //console.log(this.x)

                    },
                    click: function () {
                        alert('Clicked on spotprice history point with x: ' + this.x + ' and y: ' + this.y);
                    },
                },
                },
                marker: {
                    enabled: false
                }
            }],
            lang: {
                loading: "Laster inn",
                viewFullscreen: "Vis i fullskjerm",
                printChart: "Skriv ut graf",
                downloadPNG: "Last ned PNG bilde",
                downloadJPEG: "Last ned JPEG bilde",
                downloadCSV: "Last ned CSV",
                downloadXLS: "Last ned XLS",
                downloadPDF: "Last ned PDF",
                downloadSVG: "Last ned SVG",
                viewData: "Vis data tabell",
                hideData: "Skjul data tabell",
                weekdays: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"],
                months: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"],
                shortMonths: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"]
            },
            time: {
                useUTC: false
            },
            exporting: {
                enabled: false
            },
            credits: {
                enabled: false,
                href: "https://www.neas.mr.no",
                text: "Neas Energi Telekom AS"
            },

            responsive: {
                rules: [
                {
                chartOptions: {
                    legend: {
                        accessibility: {
                            enabled: false
                        },
                        align: "middle",
                        layout: 'horizontal',
                        verticalAlign: 'bottom',
                        enabled: false
                    },
                    },
                    condition: {
                        maxWidth: 500
                    }
                    
                },
                // Mobile (max-width: 640px)
                {
                    condition: {
                    maxWidth: 640,
                    },
                    chartOptions: {
                    chart: {
                        height: 350, // Smaller height for mobile
                    },
                    yAxis: {
                        labels: {
                        style: {
                            fontSize: '12px', // Smaller font size for labels
                        },
                        },
                    },
                    xAxis: {
                        labels: {
                        style: {
                            fontSize: '12px',
                        },
                        },
                    },
                    },
                },
                // Tablet (641px - 1024px)
                {
                    condition: {
                    minWidth: 641,
                    maxWidth: 1024,
                    },
                    chartOptions: {
                    chart: {
                        height: 450, // Medium height for tablets
                    },
                    yAxis: {
                        labels: {
                        style: {
                            fontSize: '12px', // Medium font size for labels
                        },
                        },
                    },
                    xAxis: {
                        labels: {
                        style: {
                            fontSize: '12px',
                        },
                        },
                    },
                    },
                },
                // Desktop (1025px - 1280px)
                {
                    condition: {
                    minWidth: 1025,
                    maxWidth: 1280,
                    },
                    chartOptions: {
                    chart: {
                        height: 550, // Larger height for desktops
                    },
                    yAxis: {
                        labels: {
                        style: {
                            fontSize: '14px', // Larger font size for labels
                        },
                        },
                    },
                    xAxis: {
                        labels: {
                        style: {
                            fontSize: '14px',
                        },
                        },
                    },
                    },
                },
                // XL Desktop (1281px and above)
                {
                    condition: {
                    minWidth: 1281,
                    },
                    chartOptions: {
                    chart: {
                        height: 600, // Extra-large height for XL desktops
                    },
                    yAxis: {
                        labels: {
                        style: {
                            fontSize: '16px', // Extra-large font size for labels
                        },
                        },
                    },
                    xAxis: {
                        labels: {
                        style: {
                            fontSize: '16px',
                        },
                        },
                    },
                    },
                },
                ],
            },	
        },


    };
  },
  methods: {

    goHomepage() {
      window.location.href = 'https://www.neas.no';
    },
  },
  mounted() {
   
  },
  created() {



  },
};
</script>

<style>

.rotate {
  animation: shake 1s;
  animation-iteration-count: infinite;
}
@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(2px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-2px, 1px) rotate(0deg); }
  70% { transform: translate(2px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}
.confetti-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
}
input[type="number"] {
  -moz-appearance: textfield;
  -webkit-appearance: none;
  appearance: none;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

</style>
