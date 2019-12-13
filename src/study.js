const after1 = new Promise(resolve => setTimeout(() => resolve(1), 1000))
const after2 = new Promise(resolve => setTimeout(() => resolve(2), 2000))
const after3 = new Promise(resolve => setTimeout(() => resolve(3), 3000))

const main = async () => {
  const tasks = [after3, after2, after1]// 프로미스를 배열로 가지고있다.
  //잘못된 예제  비동기에서 foreach 사용x
  tasks.forEach(async task => console.log(await task))//결과 1,2,3 반복문의 순서와 상관없이 독립적으로 실행(실행 순서를 정할수없다.) after3이 실행이 되는것 기다리지않고 가장 먼저완료되는 1부터 실행

  //올바른 예시
  for (const t of tasks) {//첫번째 변수 tasks는 실제로 받는 변수
    console.log(await (t));//3,2,1
  }
}
main();

const after1=new Promise((resolve)=>setTimeout(()=>resolve(1),1000));
const after2=new Promise((resolve)=>setTimeout(()=>resolve(2),2000));
const after3=new Promise((resolve)=>setTimeout(()=>resolve(3),3000));
const main=async ()=>{
  const tasks=[after3,after2,after1];
  tasks.forEach(async task=>console.log(await task));

  for(const t of tasks){
    console.log(await (t));
  }
}
main();





