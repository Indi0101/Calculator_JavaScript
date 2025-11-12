

function Calculator() {
    const arr_btn=[
        {id:'0-0', texto:'AC',id_css:'AC'},{id:'0-1', texto:'/',id_css:'DIV'},{id:'0-2', texto:'x',id_css:'MUL'},{id:'0-3', texto:'-',id_css:'SUB'},
        {id:'1-0', texto:'7',id_css:'SEVEN'},{id:'1-1', texto:'8',id_css:'EIGHT'},{id:'1-2', texto:'9',id_css:'NINE'},{id:'1-3', texto:'+',id_css:'ADD'},
        {id:'2-0', texto:'4',id_css:'FOUR'},{id:'2-1', texto:'5',id_css:'FIVE'},{id:'2-2', texto:'6',id_css:'SIX'},{id:'2-3', texto:'=',id_css:'EQ'},
        {id:'3-0', texto:'1',id_css:'ONE'},{id:'3-1', texto:'2',id_css:'TWO'},{id:'3-2', texto:'3',id_css:'THREE'},{id:'3-3', texto:'0',id_css:'ZERO'},
        {id:'4-0', texto:'.',id_css:'DOT'}
    ];
    const [display, setDisplay] = React.useState("0");
    const [resultado, setResultado] = React.useState("0");
    const ope="+-x/";
    const numeros="0123456789";

    const click_btn = (btn)=>{
        if(btn.texto==="AC")
        {   setDisplay("0"); 
            setResultado("0"); 
            console.clear();
            return;
        }
       if(ope.includes(btn.texto) && ope.includes(display.at(-1))) return; // Evita operadores consecutivos 
       if(btn.texto==="." && /(\.\d*)/.test(display))return; //evitar múltiples puntos en un número
       if(display.at(0)==="0" && numeros.includes(btn.texto)){ setDisplay(""); setResultado(""); }// Reemplaza el 0 inicial
        
        if(btn.texto==="=")
        {  
            console.log("BTN.TEXTO es =:");
            setResultado(prev => prev.replace(/=/g,""));

            const expresion= (resultado.length ? resultado : display).replace(/x/g,"*");
            try{
                const valor_resultado=Function(`"use strict";return(${expresion})`)(); //Crea una función con este código, ejecútala, y devuelve su resultado.
                setDisplay(String(valor_resultado));
            }catch(e){
                console.log("error :"+e);
                
            }
            return;

        }
            
        setDisplay(prev => prev.length<=26 ? ope.includes(btn.texto) ? btn.texto : prev+btn.texto :prev);
        setResultado(prev => prev.length<=26 ? prev+btn.texto : prev );
    };
    return (
        <div className="contenedor_principal">
            <div className="display_resultado">{resultado}</div>
            <div className="display">{display}</div>
            <div className="contenedor_botones">
                {arr_btn.map((btn)=>
                <button 
                    key={btn.id} 
                    id={btn.id_css} 
                    className="boton_calculadora"
                    onClick={() => click_btn(btn)}
                >
                    {btn.texto}
               </button> )
                }
            </div>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Calculator />);