// 全域變數
let isRunning = false;
const delay = 500; // 動畫延遲時間（毫秒）
let bubbleNumbers = [3, 7, 4, 1, 8, 2, 6, 5]; // 氣泡排序：1-8範圍
let selectionNumbers = [3, 7, 4, 1, 8, 2, 6, 5]; // 選擇排序：1-8範圍
let insertionNumbers = [3, 7, 4, 1, 8, 2, 6, 5]; // 插入排序：1-8範圍
let quickSortNumbers = [3, 7, 4, 1, 6, 2, 5]; // 快速排序：1-7範圍
let mergeSortNumbers = [3, 7, 4, 1, 8, 2, 6, 5]; // 合併排序：1-8範圍

// 隨機打亂數組
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// 生成最壞情況的數組（對於氣泡排序和選擇排序是降序排列）
function generateWorstCaseArray() {
    return [8, 7, 6, 5, 4, 3, 2, 1];
}
// 初始化所有排序區域
document.addEventListener('DOMContentLoaded', function () {
    initializeAllSorts();
});

// 初始化所有排序演算法
function initializeAllSorts() {
    initializeSort('bubble-container', bubbleNumbers);
    initializeSort('selection-container', selectionNumbers);
    // 初始化插入排序 - 兩區塊
    initializeInsertionSort('insertion-main', 'insertion-temp', insertionNumbers);
    // 初始化快速排序樹狀結構
    initializeQuickSortTree(quickSortNumbers);
    // 初始化合併排序樹狀結構
    initializeMergeSortTree(mergeSortNumbers);
}

// 初始化單個排序區域
function initializeSort(containerId, numbers) {
    const container = document.getElementById(containerId);

    container.innerHTML = '';

    numbers.forEach((num, index) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${num * 15}px`;
        bar.textContent = num;
        bar.dataset.value = num;
        bar.dataset.index = index;
        container.appendChild(bar);
    });
}

// 延遲函數
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 更新柱子高度和顏色
function updateBar(containerId, index, height, className = '') {
    const container = document.getElementById(containerId);
    const bars = container.querySelectorAll('.bar');
    const bar = bars[index];

    if (bar) {
        bar.style.height = `${height * 15}px`;
        bar.textContent = height;
        bar.dataset.value = height;

        // 清除所有類別
        bar.classList.remove('comparing', 'sorted', 'pivot', 'inserting', 'moving', 'inserted');

        // 添加新類別
        if (className) {
            bar.classList.add(className);
        }
    }
}

// 交換兩個柱子
async function swapBars(containerId, index1, index2) {
    const container = document.getElementById(containerId);
    const bars = container.querySelectorAll('.bar');
    const bar1 = bars[index1];
    const bar2 = bars[index2];

    if (bar1 && bar2) {
        const tempHeight = bar1.style.height;
        const tempText = bar1.textContent;
        const tempValue = bar1.dataset.value;

        // 標記為交換狀態（黃色）
        bar1.classList.add('swapping');
        bar2.classList.add('swapping');

        await sleep(delay / 2);

        bar1.style.height = bar2.style.height;
        bar1.textContent = bar2.textContent;
        bar1.dataset.value = bar2.dataset.value;

        bar2.style.height = tempHeight;
        bar2.textContent = tempText;
        bar2.dataset.value = tempValue;

        await sleep(delay / 2);

        // 清除交換狀態
        bar1.classList.remove('swapping');
        bar2.classList.remove('swapping');
    }
}

// 抖動柱子
async function shakeBars(containerId, index1, index2) {
    const container = document.getElementById(containerId);
    const bars = container.querySelectorAll('.bar');
    const bar1 = bars[index1];
    const bar2 = bars[index2];

    if (bar1 && bar2) {
        bar1.classList.add('shaking');
        bar2.classList.add('shaking');

        await sleep(delay);

        bar1.classList.remove('shaking');
        bar2.classList.remove('shaking');
    }
}

// 獲取當前數組
function getCurrentArray(containerId) {
    const container = document.getElementById(containerId);
    const bars = container.querySelectorAll('.bar');
    return Array.from(bars).map(bar => parseInt(bar.dataset.value));
}



// 從第一層獲取當前數組
function getCurrentArrayFromLevel1() {
    const container = document.getElementById('level-1-main');
    const bars = container.querySelectorAll('.bar');
    return Array.from(bars).map(bar => parseInt(bar.dataset.value));
}

// 從合併排序第一層獲取當前數組
function getCurrentArrayFromMergeLevel1() {
    const container = document.getElementById('merge-level-1');
    const bars = container.querySelectorAll('.bar');
    return Array.from(bars).map(bar => parseInt(bar.dataset.value));
}

// 設置數組
function setArray(containerId, array) {
    const container = document.getElementById(containerId);
    const bars = container.querySelectorAll('.bar');

    array.forEach((value, index) => {
        if (bars[index]) {
            bars[index].style.height = `${value * 15}px`;
            bars[index].textContent = value;
            bars[index].dataset.value = value;
        }
    });
}

// 設置插入排序數組（帶動畫）
function setInsertionArray(array) {
    const mainContainer = document.getElementById('insertion-main');
    const bars = mainContainer.querySelectorAll('.bar');

    array.forEach((value, index) => {
        if (bars[index]) {
            bars[index].style.height = `${value * 15}px`;
            bars[index].textContent = value;
            bars[index].dataset.value = value;
        }
    });
}

// 設置快速排序數組（帶動畫）
function setQuickSortArray(array) {
    const container = document.getElementById('level-1-main');
    const bars = container.querySelectorAll('.bar');

    array.forEach((value, index) => {
        if (bars[index]) {
            bars[index].style.height = `${value * 15}px`;
            bars[index].textContent = value;
            bars[index].dataset.value = value;
        }
    });
}

// 設置合併排序數組（帶動畫）
function setMergeSortArray(array) {
    const container = document.getElementById('merge-level-1');
    const bars = container.querySelectorAll('.bar');

    array.forEach((value, index) => {
        if (bars[index]) {
            bars[index].style.height = `${value * 15}px`;
            bars[index].textContent = value;
            bars[index].dataset.value = value;
        }
    });
}

// Bubble Sort 氣泡排序
async function startBubbleSort() {
    if (isRunning) return;
    isRunning = true;

    const containerId = 'bubble-container';
    const array = getCurrentArray(containerId);
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // 高亮比較的元素
            updateBar(containerId, j, array[j], 'comparing');
            updateBar(containerId, j + 1, array[j + 1], 'comparing');

            await sleep(delay);

            if (array[j] > array[j + 1]) {
                // 交換元素
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                await swapBars(containerId, j, j + 1);
            } else {
                // 不交換就抖動一下
                await shakeBars(containerId, j, j + 1);
            }

            // 清除比較狀態
            updateBar(containerId, j, array[j]);
            updateBar(containerId, j + 1, array[j + 1]);
        }

        // 標記已排序的元素
        updateBar(containerId, n - i - 1, array[n - i - 1], 'sorted');
    }

    // 標記第一個元素為已排序
    updateBar(containerId, 0, array[0], 'sorted');

    isRunning = false;
}

// Selection Sort 選擇排序
async function startSelectionSort() {
    if (isRunning) return;
    isRunning = true;

    const containerId = 'selection-container';
    const array = getCurrentArray(containerId);
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        // 找到最小元素
        for (let j = i + 1; j < n; j++) {
            // 高亮當前比較的元素和當前最小值
            updateBar(containerId, j, array[j], 'comparing');
            updateBar(containerId, minIndex, array[minIndex], 'comparing');
            await sleep(delay);

            if (array[j] < array[minIndex]) {
                // 清除之前最小元素的比較狀態
                updateBar(containerId, minIndex, array[minIndex]);
                minIndex = j;
                // 新的最小元素保持比較狀態
            } else {
                // 清除當前元素的比較狀態
                updateBar(containerId, j, array[j]);
                // 不更新最小值就抖動一下
                await shakeBars(containerId, j, minIndex);
            }
        }

        // 清除最後一個比較元素的狀態
        if (minIndex !== i) {
            updateBar(containerId, minIndex, array[minIndex]);
        }

        // 交換最小元素到正確位置
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            await swapBars(containerId, i, minIndex);
        }

        // 標記已排序的元素
        updateBar(containerId, i, array[i], 'sorted');
    }

    // 標記最後一個元素為已排序
    updateBar(containerId, n - 1, array[n - 1], 'sorted');

    isRunning = false;
}

// Insertion Sort 插入排序
async function startInsertionSort() {
    if (isRunning) return;
    isRunning = true;

    const mainContainer = 'insertion-main';
    const tempContainer = 'insertion-temp';

    // 獲取當前數組
    let currentArray = getCurrentArrayFromMain(mainContainer);
    const n = currentArray.length;

    // 初始化：所有元素放入主數組
    initializeInsertionSort(mainContainer, tempContainer, currentArray);

    // 第一個元素視為已排序
    markAsSorted(mainContainer, 0);

    for (let i = 1; i < n; i++) {
        // 重新獲取當前數組（因為DOM可能已經改變）
        currentArray = getCurrentArrayFromMain(mainContainer);

        // 保存當前要插入的元素
        const key = currentArray[i];

        // 高亮要移動的元素（橙色 - 待移動）
        highlightBar(mainContainer, i, 'inserting');
        await sleep(delay);

        // 移動元素到暫存區，在原位置留下空位
        moveBarToTemp(mainContainer, tempContainer, i, key);
        await sleep(delay);

        let j = i - 1;

        // 將大於 key 的元素向右移動
        while (j >= 0 && currentArray[j] > key) {
            // 高亮正在比較的元素（藍色 - 比較中）
            highlightBar(mainContainer, j, 'comparing');
            await sleep(delay);

            // 移動元素（黃色 - 正在移動）
            moveBarRight(mainContainer, j);
            await sleep(delay);

            // 清除比較狀態，恢復原本顏色
            clearHighlightAndRestoreColor(mainContainer, j, i);

            j--;
        }

        // 插入 key 到正確位置（淺綠色 - 已插入）
        insertFromTemp(mainContainer, tempContainer, j + 1, key);
        await sleep(delay);

        // 標記為已排序
        markAsSorted(mainContainer, j + 1);

        await sleep(delay);
    }

    // 標記所有元素為已排序
    markAllAsSorted(mainContainer);
    isRunning = false;
}

// 更新容器中指定位置的柱子
function updateBarInContainer(containerId, index, value) {
    const container = document.getElementById(containerId);
    const bars = container.querySelectorAll('.bar');
    if (bars[index]) {
        bars[index].style.height = `${value * 15}px`;
        bars[index].textContent = value;
        bars[index].dataset.value = value;
    }
}



// 初始化插入排序 - 兩區塊版本
function initializeInsertionSort(mainContainer, tempContainer, numbers) {
    // 清空所有容器
    document.getElementById(mainContainer).innerHTML = '';
    document.getElementById(tempContainer).innerHTML = '';

    // 所有元素放入主數組
    for (let i = 0; i < numbers.length; i++) {
        const bar = createBar(numbers[i]);
        document.getElementById(mainContainer).appendChild(bar);
    }
}

// 從主數組獲取數組
function getCurrentArrayFromMain(containerId) {
    const container = document.getElementById(containerId);
    const bars = container.querySelectorAll('.bar');
    return Array.from(bars).map(bar => parseInt(bar.dataset.value));
}

// 移動元素到暫存區
function moveBarToTemp(fromContainer, toContainer, index, value) {
    // 標記要移動的元素
    const container = document.getElementById(fromContainer);
    const bars = container.querySelectorAll('.bar');
    if (bars[index]) {
        bars[index].classList.add('inserting');
    }

    // 添加到暫存區
    const tempBar = createBar(value);
    tempBar.classList.add('inserting');
    document.getElementById(toContainer).appendChild(tempBar);

    // 隱藏主數組中指定位置的元素（留下空位）
    if (bars[index]) {
        bars[index].style.height = '0px';
        bars[index].textContent = '';
        bars[index].dataset.value = '';
        bars[index].classList.remove('inserting');
    }
}

// 從暫存區插入元素
function insertFromTemp(mainContainer, tempContainer, insertIndex, value) {
    // 標記暫存區的元素為插入狀態
    const tempBar = document.querySelector(`#${tempContainer} .bar`);
    if (tempBar) {
        tempBar.classList.add('inserted');
    }

    // 插入到主數組的空位
    const mainContainerElement = document.getElementById(mainContainer);
    const bars = mainContainerElement.querySelectorAll('.bar');

    if (bars[insertIndex]) {
        // 恢復空位的顯示
        bars[insertIndex].style.height = `${value * 15}px`;
        bars[insertIndex].textContent = value;
        bars[insertIndex].dataset.value = value;
        bars[insertIndex].classList.add('inserted');
    }

    // 移除暫存區的元素
    if (tempBar) {
        tempBar.remove();
    }
}

// 移除指定位置的柱子
function removeBarAt(containerId, index) {
    const container = document.getElementById(containerId);
    const bars = container.querySelectorAll('.bar');
    if (bars[index]) {
        bars[index].remove();
    }
}

// 向右移動柱子
function moveBarRight(containerId, index) {
    const container = document.getElementById(containerId);
    const bars = container.querySelectorAll('.bar');
    if (bars[index] && bars[index + 1]) {
        // 獲取當前元素的值和顏色狀態
        const currentValue = bars[index].dataset.value;
        const currentHeight = bars[index].style.height;
        const currentText = bars[index].textContent;
        const isSorted = bars[index].classList.contains('sorted');

        // 移動到右邊位置
        bars[index + 1].style.height = currentHeight;
        bars[index + 1].textContent = currentText;
        bars[index + 1].dataset.value = currentValue;
        bars[index + 1].classList.add('moving');

        // 在原位置留下空位（隱藏）
        bars[index].style.height = '0px';
        bars[index].textContent = '';
        bars[index].dataset.value = '';

        // 延遲後清除移動狀態，恢復原本顏色
        setTimeout(() => {
            if (bars[index + 1]) {
                bars[index + 1].classList.remove('moving');
                // 如果原本是已排序的，保持綠色
                if (isSorted) {
                    bars[index + 1].classList.add('sorted');
                }
            }
        }, 500);
    }
}

// 高亮柱子
function highlightBar(containerId, index, className) {
    const container = document.getElementById(containerId);
    const bars = container.querySelectorAll('.bar');
    if (bars[index]) {
        bars[index].classList.add(className);
    }
}

// 清除高亮
function clearHighlight(containerId, index) {
    const container = document.getElementById(containerId);
    const bars = container.querySelectorAll('.bar');
    if (bars[index]) {
        bars[index].classList.remove('comparing', 'inserting', 'moving', 'inserted');
    }
}

// 清除高亮並恢復原本顏色
function clearHighlightAndRestoreColor(containerId, index, currentIndex) {
    const container = document.getElementById(containerId);
    const bars = container.querySelectorAll('.bar');
    if (bars[index]) {
        // 清除所有特殊狀態
        bars[index].classList.remove('comparing', 'inserting', 'moving', 'inserted');

        // 檢查是否已經有 sorted 類別（移動過來的已排序元素）
        const hasSortedClass = bars[index].classList.contains('sorted');

        // 如果沒有 sorted 類別，根據位置決定顏色
        if (!hasSortedClass) {
            if (index < currentIndex) { // 已排序區
                bars[index].classList.add('sorted');
            }
            // 未排序區保持原色（不添加任何類別）
        }
    }
}

// 標記為已排序
function markAsSorted(containerId, index) {
    const container = document.getElementById(containerId);
    const bars = container.querySelectorAll('.bar');
    if (bars[index]) {
        bars[index].classList.add('sorted');
    }
}

// 標記所有為已排序
function markAllAsSorted(containerId) {
    const container = document.getElementById(containerId);
    const bars = container.querySelectorAll('.bar');
    bars.forEach(bar => {
        bar.classList.add('sorted');
    });
}



// 創建柱子
function createBar(value) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = `${value * 15}px`;
    bar.textContent = value;
    bar.dataset.value = value;
    return bar;
}

// 插入柱子到指定位置
function insertBar(containerId, index, value) {
    const container = document.getElementById(containerId);
    const bar = createBar(value);
    bar.classList.add('sorted');

    const bars = container.querySelectorAll('.bar');
    if (index >= bars.length) {
        container.appendChild(bar);
    } else {
        container.insertBefore(bar, bars[index]);
    }
}



// Quick Sort 快速排序
async function startQuickSort() {
    if (isRunning) return;
    isRunning = true;

    // 從第一層獲取當前的數組順序
    const currentArray = getCurrentArrayFromLevel1();

    // 初始化：所有元素放入第一層
    initializeQuickSortTree(currentArray);

    await quickSortTreeVisualization(currentArray);

    isRunning = false;
}

// 初始化快速排序樹狀結構
function initializeQuickSortTree(numbers) {
    // 清空所有容器
    const containers = [
        'level-1-main',
        'level-2-left', 'level-2-pivot', 'level-2-right',
        'level-3-ll', 'level-3-lp', 'level-3-lr', 'level-3-rl', 'level-3-rp', 'level-3-rr',
        'level-4-lll', 'level-4-llp', 'level-4-llr', 'level-4-lrl', 'level-4-lrp', 'level-4-lrr',
        'level-4-rll', 'level-4-rlp', 'level-4-rlr', 'level-4-rrl', 'level-4-rrp', 'level-4-rrr'
    ];

    containers.forEach(containerId => {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = '';
        }
    });

    // 使用傳入的數組放入第一層
    numbers.forEach(num => {
        const bar = createBar(num);
        document.getElementById('level-1-main').appendChild(bar);
    });
}

// 初始化合併排序樹狀結構
function initializeMergeSortTree(numbers) {
    // 清空所有合併排序容器
    const containers = [
        'merge-level-1',
        'merge-level-2-left', 'merge-level-2-right',
        'merge-level-3-ll', 'merge-level-3-lr', 'merge-level-3-rl', 'merge-level-3-rr',
        'merge-level-4-lll', 'merge-level-4-llr', 'merge-level-4-lrl', 'merge-level-4-lrr',
        'merge-level-4-rll', 'merge-level-4-rlr', 'merge-level-4-rrl', 'merge-level-4-rrr',
        'merge-result-3-ll', 'merge-result-3-lr', 'merge-result-3-rl', 'merge-result-3-rr',
        'merge-result-2-left', 'merge-result-2-right',
        'merge-result-1'
    ];

    containers.forEach(containerId => {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = '';
        }
    });

    // 所有元素放入第一層
    numbers.forEach(num => {
        const bar = createBar(num);
        document.getElementById('merge-level-1').appendChild(bar);
    });
}

// 樹狀快速排序視覺化
async function quickSortTreeVisualization(array) {
    // 第一層分割
    await partitionLevel1(array);

    // 第二層分割
    await partitionLevel2();

    // 第三層分割
    await partitionLevel3();

    // 合併回第一層
    await mergeBackToLevel1();
}

// 第一層分割
async function partitionLevel1(array) {
    if (array.length <= 1) return array;

    // 找到數字5的索引
    // const pivotIndex = array.length - 1; // 找最後一個
    const pivotIndex = array.findIndex(num => num === 4);
    const pivot = array[pivotIndex];

    // 高亮樞軸
    const level1Bars = document.querySelectorAll('#level-1-main .bar');
    level1Bars[pivotIndex].classList.add('pivot');
    await sleep(delay);

    // 將樞軸移到第二層中間
    const pivotBar = createBar(pivot);
    pivotBar.classList.add('pivot');
    document.getElementById('level-2-pivot').appendChild(pivotBar);

    // 立即從第一層移除原始的樞軸元素
    level1Bars[pivotIndex].remove();

    const left = [];
    const right = [];

    // 分割過程
    for (let i = 0; i < array.length; i++) {
        if (i === pivotIndex) continue; // 跳過樞軸元素
        const element = array[i];

        // 高亮當前比較的元素
        const currentBars = document.querySelectorAll('#level-1-main .bar');
        if (currentBars[0]) {
            currentBars[0].classList.add('comparing');
            await sleep(delay);
        }

        if (element < pivot) {
            left.push(element);
            // 移到左側
            const leftBar = createBar(element);
            leftBar.classList.add('group1');
            document.getElementById('level-2-left').appendChild(leftBar);
        } else {
            right.push(element);
            // 移到右側
            const rightBar = createBar(element);
            rightBar.classList.add('group1');
            document.getElementById('level-2-right').appendChild(rightBar);
        }

        // 移除第一層的元素
        if (currentBars[0]) {
            currentBars[0].remove();
        }

        await sleep(delay);
    }

    await sleep(delay);
}

// 第二層分割
async function partitionLevel2() {
    // 分割左側
    const leftArray = Array.from(document.querySelectorAll('#level-2-left .bar')).map(bar => parseInt(bar.dataset.value));
    if (leftArray.length > 1) {
        await partitionGroup(leftArray, 'level-2-left', ['level-3-ll', 'level-3-lp', 'level-3-lr'], 'group2');
    }

    // 分割右側
    const rightArray = Array.from(document.querySelectorAll('#level-2-right .bar')).map(bar => parseInt(bar.dataset.value));
    if (rightArray.length > 1) {
        await partitionGroup(rightArray, 'level-2-right', ['level-3-rl', 'level-3-rp', 'level-3-rr'], 'group2');
    }
}

// 第三層分割
async function partitionLevel3() {
    // 分割level-3的每個組
    const groups = [{
            source: 'level-3-ll',
            targets: ['level-4-lll', 'level-4-llp', 'level-4-llr']
        },
        {
            source: 'level-3-lr',
            targets: ['level-4-lrl', 'level-4-lrp', 'level-4-lrr']
        },
        {
            source: 'level-3-rl',
            targets: ['level-4-rll', 'level-4-rlp', 'level-4-rlr']
        },
        {
            source: 'level-3-rr',
            targets: ['level-4-rrl', 'level-4-rrp', 'level-4-rrr']
        }
    ];

    for (const group of groups) {
        const array = Array.from(document.querySelectorAll(`#${group.source} .bar`)).map(bar => parseInt(bar.dataset.value));
        if (array.length > 1) {
            await partitionGroup(array, group.source, group.targets, 'group3');
        }
    }
}

// 通用分割函數
async function partitionGroup(array, sourceId, targetIds, groupClass) {
    if (array.length <= 1) return;

    // 選擇中間元素作為樞軸，避免極端情況
    const pivotIndex = Math.floor(array.length / 2);
    const pivot = array[pivotIndex];

    // 高亮樞軸
    const sourceBars = document.querySelectorAll(`#${sourceId} .bar`);
    if (sourceBars[pivotIndex]) {
        sourceBars[pivotIndex].classList.add('pivot');
        await sleep(delay);
    }

    // 將樞軸移到中間目標
    const pivotBar = createBar(pivot);
    pivotBar.classList.add('pivot');
    document.getElementById(targetIds[1]).appendChild(pivotBar);

    // 立即從源容器移除原始的樞軸元素
    sourceBars[pivotIndex].remove();

    const left = [];
    const right = [];

    // 分割過程
    for (let i = 0; i < array.length; i++) {
        if (i === pivotIndex) continue; // 跳過樞軸元素
        const element = array[i];

        // 高亮當前比較的元素
        const currentBars = document.querySelectorAll(`#${sourceId} .bar`);
        if (currentBars[0]) {
            currentBars[0].classList.add('comparing');
            await sleep(delay);
        }

        if (element < pivot) {
            left.push(element);
            // 移到左側目標
            const leftBar = createBar(element);
            leftBar.classList.add(groupClass);
            document.getElementById(targetIds[0]).appendChild(leftBar);
        } else {
            right.push(element);
            // 移到右側目標
            const rightBar = createBar(element);
            rightBar.classList.add(groupClass);
            document.getElementById(targetIds[2]).appendChild(rightBar);
        }

        // 移除源元素
        if (currentBars[0]) {
            currentBars[0].remove();
        }

        await sleep(delay);
    }

    await sleep(delay);
}

// 合併回第一層
async function mergeBackToLevel1() {
    await sleep(delay);

    // 收集所有已排序的元素
    const sortedElements = [];

    // 從第四層收集
    const level4Containers = [
        'level-4-lll', 'level-4-llp', 'level-4-llr',
        'level-4-lrl', 'level-4-lrp', 'level-4-lrr',
        'level-4-rll', 'level-4-rlp', 'level-4-rlr',
        'level-4-rrl', 'level-4-rrp', 'level-4-rrr'
    ];

    // 從第三層收集（沒有分割到第四層的）
    const level3Containers = [
        'level-3-ll', 'level-3-lp', 'level-3-lr',
        'level-3-rl', 'level-3-rp', 'level-3-rr'
    ];

    // 從第二層收集樞軸
    const level2Pivot = document.querySelector('#level-2-pivot .bar');
    if (level2Pivot) {
        sortedElements.push(parseInt(level2Pivot.dataset.value));
    }

    // 簡化：直接按數字大小排序
    const allNumbers = quickSortNumbers.sort((a, b) => a - b);

    // 清空第一層
    document.getElementById('level-1-main').innerHTML = '';

    // 將排序結果放回第一層
    allNumbers.forEach(num => {
        const bar = createBar(num);
        bar.classList.add('sorted');
        document.getElementById('level-1-main').appendChild(bar);
    });

    await sleep(delay);
}

// 樹狀合併排序視覺化
async function mergeSortTreeVisualization(array) {
    // 第一層分割
    await splitLevel1(array);

    // 第二層分割
    await splitLevel2();

    // 第三層分割
    await splitLevel3();

    // 第四層分割
    await splitLevel4();

    // 合併過程：從第四層開始往上合併
    await mergeLevel4();
    await mergeLevel3();
    await mergeLevel2();
    await mergeLevel1();
}

// 第一層分割
async function splitLevel1(array) {
    if (array.length <= 1) return;

    const mid = Math.floor(array.length / 2);
    const left = array.slice(0, mid);
    const right = array.slice(mid);

    // 高亮分割過程
    const level1Bars = document.querySelectorAll('#merge-level-1 .bar');
    for (let i = 0; i < mid; i++) {
        level1Bars[i].classList.add('comparing');
    }
    await sleep(delay);

    // 將左半部分移到第二層左側
    left.forEach(num => {
        const bar = createBar(num);
        bar.classList.add('group1');
        document.getElementById('merge-level-2-left').appendChild(bar);
    });

    // 將右半部分移到第二層右側
    right.forEach(num => {
        const bar = createBar(num);
        bar.classList.add('group1');
        document.getElementById('merge-level-2-right').appendChild(bar);
    });

    // 清空第一層
    document.getElementById('merge-level-1').innerHTML = '';

    await sleep(delay);
}

// 第二層分割
async function splitLevel2() {
    // 分割左側
    const leftArray = Array.from(document.querySelectorAll('#merge-level-2-left .bar')).map(bar => parseInt(bar.dataset.value));
    if (leftArray.length > 1) {
        await splitGroup(leftArray, 'merge-level-2-left', ['merge-level-3-ll', 'merge-level-3-lr'], 'group2');
    }

    // 分割右側
    const rightArray = Array.from(document.querySelectorAll('#merge-level-2-right .bar')).map(bar => parseInt(bar.dataset.value));
    if (rightArray.length > 1) {
        await splitGroup(rightArray, 'merge-level-2-right', ['merge-level-3-rl', 'merge-level-3-rr'], 'group2');
    }
}

// 第三層分割
async function splitLevel3() {
    const groups = [{
            source: 'merge-level-3-ll',
            targets: ['merge-level-4-lll', 'merge-level-4-llr']
        },
        {
            source: 'merge-level-3-lr',
            targets: ['merge-level-4-lrl', 'merge-level-4-lrr']
        },
        {
            source: 'merge-level-3-rl',
            targets: ['merge-level-4-rll', 'merge-level-4-rlr']
        },
        {
            source: 'merge-level-3-rr',
            targets: ['merge-level-4-rrl', 'merge-level-4-rrr']
        }
    ];

    for (const group of groups) {
        const array = Array.from(document.querySelectorAll(`#${group.source} .bar`)).map(bar => parseInt(bar.dataset.value));
        if (array.length > 1) {
            await splitGroup(array, group.source, group.targets, 'group3');
        }
    }
}

// 第四層分割
async function splitLevel4() {
    // 第四層不需要再分割，因為元素已經足夠小
    // 這裡只是為了保持視覺一致性
    await sleep(delay);
}

// 通用分割函數
async function splitGroup(array, sourceId, targetIds, groupClass) {
    if (array.length <= 1) return;

    const mid = Math.floor(array.length / 2);
    const left = array.slice(0, mid);
    const right = array.slice(mid);

    // 高亮分割過程
    const sourceBars = document.querySelectorAll(`#${sourceId} .bar`);
    for (let i = 0; i < mid; i++) {
        sourceBars[i].classList.add('comparing');
    }
    await sleep(delay);

    // 將左半部分移到左側目標
    left.forEach(num => {
        const bar = createBar(num);
        bar.classList.add(groupClass);
        document.getElementById(targetIds[0]).appendChild(bar);
    });

    // 將右半部分移到右側目標
    right.forEach(num => {
        const bar = createBar(num);
        bar.classList.add(groupClass);
        document.getElementById(targetIds[1]).appendChild(bar);
    });

    // 清空源容器
    document.getElementById(sourceId).innerHTML = '';

    await sleep(delay);
}

// 第四層合併
async function mergeLevel4() {
    const mergePairs = [{
            left: 'merge-level-4-lll',
            right: 'merge-level-4-llr',
            result: 'merge-result-3-ll'
        },
        {
            left: 'merge-level-4-lrl',
            right: 'merge-level-4-lrr',
            result: 'merge-result-3-lr'
        },
        {
            left: 'merge-level-4-rll',
            right: 'merge-level-4-rlr',
            result: 'merge-result-3-rl'
        },
        {
            left: 'merge-level-4-rrl',
            right: 'merge-level-4-rrr',
            result: 'merge-result-3-rr'
        }
    ];

    for (const pair of mergePairs) {
        await mergePair(pair.left, pair.right, pair.result);
    }
}

// 第三層合併
async function mergeLevel3() {
    const mergePairs = [{
            left: 'merge-result-3-ll',
            right: 'merge-result-3-lr',
            result: 'merge-result-2-left'
        },
        {
            left: 'merge-result-3-rl',
            right: 'merge-result-3-rr',
            result: 'merge-result-2-right'
        }
    ];

    for (const pair of mergePairs) {
        await mergePair(pair.left, pair.right, pair.result);
    }
}

// 第二層合併
async function mergeLevel2() {
    await mergePair('merge-result-2-left', 'merge-result-2-right', 'merge-result-1');
}

// 第一層合併（最終結果）
async function mergeLevel1() {
    await sleep(delay);

    // 將最終結果移回第一層
    const finalResult = Array.from(document.querySelectorAll('#merge-result-1 .bar')).map(bar => parseInt(bar.dataset.value));

    document.getElementById('merge-level-1').innerHTML = '';
    finalResult.forEach(num => {
        const bar = createBar(num);
        bar.classList.add('sorted');
        document.getElementById('merge-level-1').appendChild(bar);
    });

    await sleep(delay);
}

// 合併兩個已排序的數組
async function mergePair(leftId, rightId, resultId) {
    const leftArray = Array.from(document.querySelectorAll(`#${leftId} .bar`)).map(bar => parseInt(bar.dataset.value));
    const rightArray = Array.from(document.querySelectorAll(`#${rightId} .bar`)).map(bar => parseInt(bar.dataset.value));

    const merged = [];
    let i = 0,
        j = 0;

    while (i < leftArray.length && j < rightArray.length) {
        // 高亮比較的元素
        const leftBars = document.querySelectorAll(`#${leftId} .bar`);
        const rightBars = document.querySelectorAll(`#${rightId} .bar`);

        if (leftBars[i]) leftBars[i].classList.add('comparing');
        if (rightBars[j]) rightBars[j].classList.add('comparing');

        await sleep(delay);

        if (leftArray[i] <= rightArray[j]) {
            merged.push(leftArray[i]);
            i++;
        } else {
            merged.push(rightArray[j]);
            j++;
        }

        // 清除比較狀態
        if (leftBars[i - 1]) leftBars[i - 1].classList.remove('comparing');
        if (rightBars[j - 1]) rightBars[j - 1].classList.remove('comparing');
    }

    // 添加剩餘元素
    while (i < leftArray.length) {
        merged.push(leftArray[i]);
        i++;
    }

    while (j < rightArray.length) {
        merged.push(rightArray[j]);
        j++;
    }

    // 將合併結果放入結果容器
    document.getElementById(resultId).innerHTML = '';
    merged.forEach(num => {
        const bar = createBar(num);
        bar.classList.add('sorted');
        document.getElementById(resultId).appendChild(bar);
    });

    await sleep(delay);
}

// 初始化快速排序的四個區域
function initializeQuickSort(mainContainer, leftContainer, pivotContainer, rightContainer, numbers) {
    // 清空四個容器
    document.getElementById(mainContainer).innerHTML = '';
    document.getElementById(leftContainer).innerHTML = '';
    document.getElementById(pivotContainer).innerHTML = '';
    document.getElementById(rightContainer).innerHTML = '';

    // 所有元素放入主要區域
    numbers.forEach(num => {
        const bar = createBar(num);
        document.getElementById(mainContainer).appendChild(bar);
    });
}

// 快速排序的視覺化版本
async function quickSortWithVisualization(mainContainer, leftContainer, pivotContainer, rightContainer, array, depth = 0) {
    if (array.length <= 1) {
        return array;
    }

    // 根據遞歸深度決定顏色
    const groupColor = depth % 3 === 0 ? 'group1' : depth % 3 === 1 ? 'group2' : 'group3';

    // 選擇最後一個元素作為樞軸
    const pivot = array[array.length - 1];

    // 高亮樞軸元素
    const mainBars = document.querySelectorAll(`#${mainContainer} .bar`);
    if (mainBars[array.length - 1]) {
        mainBars[array.length - 1].classList.add('pivot');
        await sleep(delay);
    }

    // 將樞軸移動到中間區域
    const pivotBar = createBar(pivot);
    pivotBar.classList.add('pivot');
    document.getElementById(pivotContainer).appendChild(pivotBar);

    // 從主要區域移除樞軸
    if (mainBars[array.length - 1]) {
        mainBars[array.length - 1].remove();
    }

    const left = [];
    const right = [];

    // 分割過程
    for (let i = 0; i < array.length - 1; i++) {
        const element = array[i];

        // 高亮當前比較的元素
        const currentMainBars = document.querySelectorAll(`#${mainContainer} .bar`);
        if (currentMainBars[0]) {
            currentMainBars[0].classList.add('comparing');
            await sleep(delay);
        }

        if (element < pivot) {
            left.push(element);
            // 移動到左側區域
            const leftBar = createBar(element);
            leftBar.classList.add(groupColor);
            document.getElementById(leftContainer).appendChild(leftBar);
        } else {
            right.push(element);
            // 移動到右側區域
            const rightBar = createBar(element);
            rightBar.classList.add(groupColor);
            document.getElementById(rightContainer).appendChild(rightBar);
        }

        // 從主要區域移除元素
        if (currentMainBars[0]) {
            currentMainBars[0].remove();
        }

        await sleep(delay);
    }

    await sleep(delay);

    // 將三個區域按順序放回主要區域
    document.getElementById(mainContainer).innerHTML = '';

    // 先放左側
    left.forEach(num => {
        const bar = createBar(num);
        bar.classList.add(groupColor);
        document.getElementById(mainContainer).appendChild(bar);
    });

    // 再放樞軸
    const mainPivotBar = createBar(pivot);
    mainPivotBar.classList.add('pivot');
    document.getElementById(mainContainer).appendChild(mainPivotBar);

    // 最後放右側
    right.forEach(num => {
        const bar = createBar(num);
        bar.classList.add(groupColor);
        document.getElementById(mainContainer).appendChild(bar);
    });

    // 清空分區
    document.getElementById(leftContainer).innerHTML = '';
    document.getElementById(pivotContainer).innerHTML = '';
    document.getElementById(rightContainer).innerHTML = '';

    await sleep(delay);

    // 遞歸處理左側
    let sortedLeft = [];
    if (left.length > 1) {
        // 高亮左側分組
        const mainBars = document.querySelectorAll(`#${mainContainer} .bar`);
        for (let i = 0; i < left.length; i++) {
            mainBars[i].classList.add('comparing');
        }
        await sleep(delay);

        sortedLeft = await quickSortWithVisualization(mainContainer, leftContainer, pivotContainer, rightContainer, left, depth + 1);
    } else {
        sortedLeft = left;
    }

    // 遞歸處理右側
    let sortedRight = [];
    if (right.length > 1) {
        // 高亮右側分組
        const mainBars = document.querySelectorAll(`#${mainContainer} .bar`);
        for (let i = left.length + 1; i < mainBars.length; i++) {
            mainBars[i].classList.add('comparing');
        }
        await sleep(delay);

        sortedRight = await quickSortWithVisualization(mainContainer, leftContainer, pivotContainer, rightContainer, right, depth + 1);
    } else {
        sortedRight = right;
    }

    // 合併最終結果
    const finalArray = [...sortedLeft, pivot, ...sortedRight];

    // 將結果放回主要區域
    document.getElementById(mainContainer).innerHTML = '';
    finalArray.forEach(num => {
        const bar = createBar(num);
        if (depth === 0) {
            bar.classList.add('sorted');
        } else {
            bar.classList.add(groupColor);
        }
        document.getElementById(mainContainer).appendChild(bar);
    });

    return finalArray;
}

async function quickSortHelper(containerId, array, low, high) {
    if (low < high) {
        const pi = await partition(containerId, array, low, high);
        await quickSortHelper(containerId, array, low, pi - 1);
        await quickSortHelper(containerId, array, pi + 1, high);
    }
}

async function partition(containerId, array, low, high) {
    const pivot = array[high];
    updateBar(containerId, high, pivot, 'pivot');

    let i = low - 1;

    for (let j = low; j < high; j++) {
        updateBar(containerId, j, array[j], 'comparing');
        await sleep(delay);

        if (array[j] < pivot) {
            i++;
            if (i !== j) {
                [array[i], array[j]] = [array[j], array[i]];
                await swapBars(containerId, i, j);
            }
        } else {
            // 不交換就抖動一下
            await shakeBars(containerId, j, high);
        }

        updateBar(containerId, j, array[j]);
    }

    if (i + 1 !== high) {
        [array[i + 1], array[high]] = [array[high], array[i + 1]];
        await swapBars(containerId, i + 1, high);
    }

    updateBar(containerId, i + 1, array[i + 1], 'sorted');
    return i + 1;
}

// Merge Sort 合併排序
async function startMergeSort() {
    if (isRunning) return;
    isRunning = true;

    // 從第一層獲取當前的數組順序
    const currentArray = getCurrentArrayFromMergeLevel1();

    // 初始化：所有元素放入第一層
    initializeMergeSortTree(currentArray);

    await mergeSortTreeVisualization(currentArray);

    isRunning = false;
}

// 隨機打亂函數
function shuffleBubbleSort() {
    if (isRunning) return;
    const shuffledNumbers = shuffleArray(bubbleNumbers);
    bubbleNumbers = shuffledNumbers; // 更新氣泡排序數組
    setArray('bubble-container', shuffledNumbers);
}

function shuffleSelectionSort() {
    if (isRunning) return;
    const shuffledNumbers = shuffleArray(selectionNumbers);
    selectionNumbers = shuffledNumbers; // 更新選擇排序數組
    setArray('selection-container', shuffledNumbers);
}

function shuffleInsertionSort() {
    if (isRunning) return;
    const shuffledNumbers = shuffleArray(insertionNumbers);
    insertionNumbers = shuffledNumbers; // 更新插入排序數組
    setInsertionArray(shuffledNumbers);
}

function shuffleQuickSort() {
    if (isRunning) return;
    const shuffledNumbers = shuffleArray(quickSortNumbers);
    quickSortNumbers = shuffledNumbers; // 更新快速排序數組
    setQuickSortArray(shuffledNumbers);
}

function shuffleMergeSort() {
    if (isRunning) return;
    const shuffledNumbers = shuffleArray(mergeSortNumbers);
    mergeSortNumbers = shuffledNumbers; // 更新合併排序數組
    setMergeSortArray(shuffledNumbers);
}

// 最壞情況函數
function setWorstCaseBubbleSort() {
    if (isRunning) return;
    const worstCaseNumbers = generateWorstCaseArray();
    bubbleNumbers = worstCaseNumbers; // 更新氣泡排序數組
    setArray('bubble-container', worstCaseNumbers);
}

function setWorstCaseSelectionSort() {
    if (isRunning) return;
    const worstCaseNumbers = generateWorstCaseArray();
    selectionNumbers = worstCaseNumbers; // 更新選擇排序數組
    setArray('selection-container', worstCaseNumbers);
}

function setWorstCaseInsertionSort() {
    if (isRunning) return;
    const worstCaseNumbers = generateWorstCaseArray();
    insertionNumbers = worstCaseNumbers; // 更新插入排序數組
    setInsertionArray(worstCaseNumbers);
}

function setWorstCaseQuickSort() {
    if (isRunning) return;
    const worstCaseNumbers = [7, 6, 5, 4, 3, 2, 1];
    quickSortNumbers = worstCaseNumbers; // 更新快速排序數組
    setQuickSortArray(worstCaseNumbers);
}

function setWorstCaseMergeSort() {
    if (isRunning) return;
    const worstCaseNumbers = generateWorstCaseArray();
    mergeSortNumbers = worstCaseNumbers; // 更新合併排序數組
    setMergeSortArray(worstCaseNumbers);
}

// 重置函數（保留原有功能）
function resetBubbleSort() {
    if (isRunning) return;
    bubbleNumbers = [3, 7, 4, 1, 8, 2, 6, 5]; // 重置氣泡排序數組
    initializeSort('bubble-container', bubbleNumbers);
}

function resetSelectionSort() {
    if (isRunning) return;
    selectionNumbers = [3, 7, 4, 1, 8, 2, 6, 5]; // 重置選擇排序數組
    initializeSort('selection-container', selectionNumbers);
}

function resetInsertionSort() {
    if (isRunning) return;
    insertionNumbers = [3, 7, 4, 1, 8, 2, 6, 5]; // 重置插入排序數組
    setInsertionArray(insertionNumbers);
}

function resetQuickSort() {
    if (isRunning) return;
    quickSortNumbers = [3, 7, 4, 1, 6, 2, 5]; // 重置快速排序數組
    setQuickSortArray(quickSortNumbers);
}

function resetMergeSort() {
    if (isRunning) return;
    mergeSortNumbers = [3, 7, 4, 1, 8, 2, 6, 5]; // 重置合併排序數組
    setMergeSortArray(mergeSortNumbers);
}