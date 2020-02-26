<template>
  <div>
    <v-content  fluid class="c1"  >
      <v-row>
        <v-col class="inp"  align="middle">
 <h2 class="stext">Stepdemy SD</h2>
    </v-col>
     </v-row>
     <v-row>
        <v-col  align="middle">
          <v-autocomplete 
          class=" sbox"
           placeholder="Пошук.."
          rounded
          >
            
            </v-autocomplete>  
          <v-text-field style="display:none"
          placeholder="Dense & Rounded"
          rounded
          class=" sbox"
          ></v-text-field>
 <input style="display:none" class=" sbox" type="text" placeholder="Пошук..">    </v-col>
     </v-row>

    </v-content>
    <v-container  fluid  class="mb-12 sm">
 <v-row  >
<v-col  class="mn" >
<div class="smen">

    <div class="ibl">
        <v-icon size="50px">mdi-account</v-icon>
    </div>

</div>

</v-col>
<v-col class="mn">

  <div class="smenb">
      <div class="ibl">
          <v-icon large>mdi-account </v-icon>
      </div>
  </div>
</v-col>
<v-col class="mn">
  <div class="smen">

      <div class="ibl">
          <v-icon>mdi-account</v-icon>
      </div>
  </div>
</v-col>

 </v-row>

    </v-container>
    <v-container  class="mb-12">
<v-row  class="courses justify-space-around" >
 <v-card v-for="x in 4" :key="x" ><div><h1 class="white--text">Назва Курсу</h1>

 <p class="white--text">К-ть уроків</p>
 </div></v-card>
 
</v-row>
<v-row class=" courses justify-space-around mt-7">
<v-card v-for="x in 4" :key="x" ><div><h1 class="white--text">Назва Курсу</h1>

 <p class="white--text">К-ть уроків</p>
 </div></v-card>
</v-row>
<v-row class="courses justify-space-around mt-7 mb-10">
<v-card v-for="x in 4" :key="x" ><div><h1 class="white--text">Назва Курсу</h1>

 <p class="white--text">К-ть уроків</p>
 </div></v-card>
 
</v-row>
    </v-container>
   
  

    <v-footer
    absolute
    dark      
      class="font-weight-medium  white--text  "
    >
      <v-col
        class="text-center"
        cols="12"
      >
     <strong>Львів</strong>   {{ new Date().getFullYear() }} 
      </v-col>
    </v-footer>
    
  </div>
</template>
<style  scoped>
.stext{
  font-size: 50px;
}
.txt{
  font-size: 50px;
}
.c1{
  height: 550px;
width: 100%;
 


}
.ibl{
    width: 162px;
    height: 162px;
    border:1px solid black;
    margin-top: 20px;
}
.mn{
  justify-content: center;
display: flex;
}
.sm{
  border: 1px solid black;
  background: #4E5256
}
.smen{
width: 300px;
height: 300px;
margin-top: 50px;
border-radius: 10px;
background: white;
    display: flex ;
    justify-content: center;

}
.smenb{
  
  background: white;
width: 300px;
height: 500px;
border-radius: 10px;
    display: flex;
    justify-content: center;

}

.blackt{
 height: 130px;
 background: rgba(0, 0, 0, 0.75);
 background-size: 100%;
width: 100%;
margin-top: 60px;



justify-content:center;
}
.comp{
  width: 500px;
  height: 45px;
  background: rgba(128, 128, 128, 0.5);
  font-size: 20px;
  
}
.courses > div{
  border:1px solid black;
  height:150px;
   width:250px;
   background-size:contain;
   border-style:none;
   background-position: center;  
   
   background-image: url('https://tadtadya.com/en/wp-content/uploads/sites/2/2017/09/html5-css3.png');
   background-color:lightgray;
   
   
}
.ft{
  background:black;
}
.sbox{
background:   white;
color: black;
height:50px;
width: 500px;
font-size: 25px;
padding-left: 30px;
/*border-radius: 20px;*/
border:1px solid black;
}
.blacktm{
  height: 90px;
 background: rgba(0, 0, 0, 0.75);
 background-size: 100%;
 margin-top: 50px;
width: 100%;

}
.courses > div>div{
 height: 90px;
 background: rgba(0, 0, 0, 0.75);
 background-size: 100%;
 margin-top: 50px;
width: 100%;
text-align: center;

}

.courses > div:hover>div{
 display: none;

}


.blacktm:hover{
display: none;
}


</style>
