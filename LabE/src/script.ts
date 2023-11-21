
const style:string[]=['./styles/style1.css','./styles/style2.css','./styles/style3.css']
class AppState{

    private styleList:string[];

    public hrefId!: HTMLLinkElement;
    public divId!: HTMLDivElement;

    constructor() {

        this.styleList=style;
        this.divId = document.getElementById("styleLinks") as HTMLDivElement;
        this.hrefId = document.getElementById("linkStyle") as HTMLLinkElement;
        console.log(`Default Type ${this.styleList[0]}`)
    }

    public getStyles(){
        return this.styleList;
    }
    private handleLinkClick(link:HTMLAnchorElement){
        link.addEventListener('click',(event)=>{
            event.preventDefault();
            this.hrefId.setAttribute('href',link.href);
            
            console.log(`Zmieniono na ${link.textContent}`)
        })
    }
    public makeLinks(){
        if(this.divId) {
            const style=this.getStyles();
            for (let i=0;i<style.length;i++) {
                const link = document.createElement("a");
                link.href=style[i];
                link.textContent=`Style ${i + 1}`;

                this.handleLinkClick(link);
                this.divId.appendChild(link);

                this.divId.appendChild(document.createElement('br'))
                console.log(`Added style ${link.textContent}`);

            }
        }else{
            console.log("div not found")
        }
    }

}
const appState=new AppState();

appState.makeLinks();
