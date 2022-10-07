/** 메아리 말투 생성기 */
export class EchoGenerator{
    /** 메아리 말투 생성기 */
    constructor(){
        this.$ellipsis = document.getElementById('echo-check-ellipsis');
        this.$textarea = document.getElementById('echo-text');
        this.$result = document.getElementById('echo-result')
        this.$btnGen = document.getElementById('echo-btn-generate');
        this.$btnCopy = document.getElementById('echo-btn-copy-result');
        this.$tooltip = document.getElementById('echo-tooltip');
        this.ellipsis = "⋯";
        this.init();
    }

    init(){
        this.add_events();
    }//init

    add_events(){
        this.$btnGen.addEventListener('click',this.generate_echo);
        this.$btnCopy.addEventListener('click',this.copy_result);
    }//add_events

    /** 에코 생성 시작 
     * @see https://regexr.com/5mhou
     * @see http://regexp.elex.pe.kr/regular-expression
    */
    generate_echo = () => {
        // 텍스트 정돈
        let text = this.$textarea.value.trim();
        if(!text){
            this.$textarea.value = "";
            this.$textarea.focus();
            return;
        };
        const removeSpaceDouble = /\s{2,}/gi;
        const removeEnter = /\n/gi;
        text = text.replace(removeSpaceDouble,"");
        text = text.replace(removeEnter," ");
        this.$textarea.value = text;

        //
        const textArray = text.split(' ');
        const useEllipsis = this.$ellipsis.checked;
        let per = 1;
        
        for(let i=0; i<textArray.length - 1; i += per){
            // console.log(i);
            per = parseInt(Math.random() * 3 + 1);
            const word = textArray[i];
            const copy = word.slice(parseInt(Math.random() * (word.length - 1)),word.length);
            const string = `${useEllipsis?this.ellipsis:" "}${copy}`
            const random = parseInt(Math.random() * 2 + 1);
            for(let k=0; k<random; k++){
                textArray[i] += string;
            }
        }

        this.$result.textContent = textArray.join(' ');
    }//generate_echo
    
    /**
     * 결과 텍스트 복사
     * @see https://velog.io/@godori/js-clipboard-copy
     */
    copy_result = () => {
        //복사
        const $tempText = document.createElement('TEXTAREA');
        $tempText.value = this.$result.textContent;
        document.body.appendChild($tempText);
        $tempText.select();
        $tempText.setSelectionRange(0,9999);
        document.execCommand('copy');
        document.body.removeChild($tempText);

        //복사 완료 안내 메세지
        this.$tooltip.classList.add('on');
        setTimeout(()=>{
            this.$tooltip.classList.remove('on');
        },1000);
    }//copy_result
}//EchoGenerator