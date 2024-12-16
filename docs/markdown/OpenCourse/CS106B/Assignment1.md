# Welcome to C++!

## 课程内容
- [Containers, Part I:Vector,gird](https://www.youtube.com/watch?v=MAMDj22C08E&list=PL-h0BZdG_K4kAmsfvAik-Za826pNbQd0d&index=6&pp=iAQB)
- [Containers, Part II:Stacks,Queues](https://www.youtube.com/watch?v=bkWsQuKqqUk&list=PL-h0BZdG_K4kAmsfvAik-Za826pNbQd0d&index=7&pp=iAQB)
- [Containers, Part III:: Sets,Maps](https://www.youtube.com/watch?v=8J6X3nJy9c8&list=PL-h0BZdG_K4kAmsfvAik-Za826pNbQd0d&index=8&pp=iAQB)

主要就是常见的containers,没什么太多东西，但就是本课程没有使用标准库，都是采用的在A0中的cs106的库中的containers实现的，所以写的时候需要注意


## 作业实例

### Part One: Stack Overflows
在使用断点和不使用断点的情况下，分别观察一次堆栈溢出，点击运行就完了。


### Part Two: Only Connect
输入一个字符串，删除所有的非辅音字符，然后返回剩下的并大写，（本课程的一个核心点就是**递归**，随意推荐使用递归写）
```cpp
bool isVowel(char ch)
{
    static const set<char> vowels = {'a', 'e', 'i', 'o', 'u'};
    ch = tolower(ch); // 转为小写
    return vowels.find(ch) != vowels.end();
}
string onlyConnectize(string phrase)
{
    /* TODO: The next few lines just exist to make sure you don't get compiler warning messages
     * when this function isn't implemented. Delete these lines, then implement this function.
     */
    string result = "";
    if (phrase.length() == 0)
    {
        return "";
    }
    if (isalpha(phrase[0]))
    {
        if (!isVowel(phrase[0]))
        {
            result += toupper(phrase[0]);
            result += onlyConnectize(phrase.substr(1));
        }
        if (isVowel(phrase[0]))
        {
            result += onlyConnectize(phrase.substr(1));
        }
    }else{
        result += onlyConnectize(phrase.substr(1));
    }
    return result;
}
```
### Part Three: Playing Fair
引入有点长，简单来说就是，两人要进行一个多局游戏，但是在选方中，有一方具有优势，如何使比赛更公平
也是使用递归写就完了
```cpp
string aSequenceOfOrder(int n) {
    /* TODO: Delete this line and the next two lines, then implement this function. */
    if(n<0)
    {error("a string containing your error message");return "";}
    string n0= "A";
    string n1= "AB";
    if (n==0) return n0;
    if (n==1) return n1;
    return aSequenceOfOrder(n-1) + bSequenceOfOrder(n-1);
}

string bSequenceOfOrder(int n) {
    /* TODO: Delete this line and the next two lines, then implement this function. */
    if(n<0)
    {error("a string containing your error message");return "";}
    string n0= "B";
    string n1= "BA";
    if (n==0) return n0;
    if (n==1) return n1;
    return bSequenceOfOrder(n-1) + aSequenceOfOrder(n-1);
}
```

### Part Four: Sandpiles
简单的递归模拟，没什么好说的，就是递归模拟
```cpp
void dropSandOn(Grid<int>& world, int row, int col) {
    if (world.inBounds(row, col) == false) return;
    world[row][col] += 1;

    if (world[row][col] >= 4) {
        world[row][col] -= 4;
        if (row - 1 >= 0) dropSandOn(world, row - 1, col);
        if (row + 1 < world.numRows()) dropSandOn(world, row + 1, col);
        if (col - 1 >= 0) dropSandOn(world, row, col - 1);
        if (col + 1 < world.numCols()) dropSandOn(world, row, col + 1);
    }
}
```

### Part Five: Plotter
也是模拟，不过不用递归了，根据它的描述实现就行了，体力活。
```cpp
void runPlotterScript(istream& input) {
    bool ud=0;
    double x1=0,y1=0,x2,y2;
    string op;
    PenStyle pen={1,"black"};
    while(!input.eof()){
        input>>op;
        if(op=="penup"){
            ud=0;
        }
        else if(op=="pendown"){
            ud=1;
        }
        else if(op=="moverel"){
            double a,b;
            input>>a>>b;
            x2+=a;
            y2+=b;
            if(ud){
                drawLine(x1,y1,x2,y2,pen);
            }
            x1=x2;
            y1=y2;
        }else if(op=="moveabs"){
            input>>x2>>y2;
            if(ud){
                drawLine(x1,y1,x2,y2,pen);
            }
            x1=x2;
            y1=y2;
        }
        else if(op=="penwidth"){
            input>>pen.width;
        }else if(op=="color"){
            input>>pen.color;
        }
    }
}
```
