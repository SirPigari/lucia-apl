const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            document.getElementById('mobile-menu').classList.add('hidden');
        }
    });
});

const menuBtn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');

let isAnimating = false;

// Ensure proper overlay styling when the page loads
menu.classList.add(
    'fixed', 'top-16', 'left-0', 'w-full',
    'z-50', 'transition-all', 'duration-300', 'ease-in-out'
);

menuBtn.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;

    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden', 'mobile-menu-hide');
        menu.classList.add('mobile-menu-show');
        setTimeout(() => {
            isAnimating = false;
        }, 300);
    } else {
        menu.classList.remove('mobile-menu-show');
        menu.classList.add('mobile-menu-hide');
        setTimeout(() => {
            menu.classList.add('hidden');
            menu.classList.remove('mobile-menu-hide');
            isAnimating = false;
        }, 300);
    }
});



const sidebarLinks = document.querySelectorAll('.sidebar-link');

sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        sidebarLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Example viewer functionality
const examples = {
    'bubble-sort': {
        title: 'Bubble Sort Algorithm',
        code: `public static final fun bubbleSort(arr: list) -> list:
    n: int = len(arr)

    for (i in [0...n - 1]):
        n1 = n - i - 2
        for (j in [0...n1]):
            aj: int = arr[j]
            aj1: int = arr[j + 1]

            if (aj > aj1):
                arr[j] = aj1
                arr[j + 1] = aj
            end
        end
    end
    return arr
end

arr: list = [64, 34, 25, 12, 22, 11, 90]
print(bubbleSort(arr))`
            },
            'factorial-iterative': {
                title: 'Factorial (Iterative)',
                code: `public static final fun factorialIterative(n: int) -> any:
    result: int = 1
    for (i in [1...n]):
        result = result * i
    end
    return result
end

num: int = 5
print(factorialIterative(num))`
            },
            'factorial-recursive': {
                title: 'Factorial (Recursive)',
                code: `public fun factorialRecursive(n: int) -> int:
    if (n <= 1):
        return 1
    end
    return n * factorialRecursive(n - 1)
end

num: int = 5
print(factorialRecursive(num))`
            },
            'fibonacci': {
                title: 'Fibonacci Sequence',
                code: `import math
setprec(1000) \/\/ Important for high precision calculations

public static final fun fib(n: int) -> int:
    t1: float = math.goldenRatio
    t2: float = (1 - math.sqrt(5))
    t1: float = t1 / 2
    t2: float = t2 / 2
    t3: float = math.sqrt(5)

    t4: float = (t1 ^ n) - (t2 ^ n)
    t5: float = t4 / t3

    return int(t5)
end

print(fib(42))`
            },
            'fizzbuzz': {
                title: 'FizzBuzz',
                code: `public static final fun fizzbuzz(n: int) -> any:
    output = ""
    if (n % 3 == 0):
        output = output + "Fizz"
    end
    if (n % 5 == 0):
        output = output + "Buzz"
    end
    if (output == ""):
        output = n
    end
    return output
end

public static final fun main() -> void:
    for (i in [1...100]):
        print(fizzbuzz(i))
    end
end

main()`
            },
            'prime-checker': {
                title: 'Prime Number Checker',
                code: `public static final fun isPrime(num: int) -> bool:
    if (num < 2):
        return false
    end
    for (i in [2...num - 1]):
        if (num % i == 0):
            return false
        end
    end
    return true
end

for (num in [1...100]):
    print(num, isPrime(num))
end`
    }
};

function showExample(id) {
    const example = examples[id];
    document.getElementById('example-title').textContent = example.title;
    document.getElementById('example-code').textContent = example.code;
    document.getElementById('example-modal').classList.remove('hidden');

    document.body.style.overflow = 'hidden';

    highlightSyntax();
}

function hideExample() {
    document.getElementById('example-modal').classList.add('hidden');

    document.body.style.overflow = '';
}


function highlightSyntax() {
    const codeElement = document.getElementById('example-code');
    highlightSyntaxInput(codeElement);
}

function highlightSyntaxInput(codeElement) {
    let code = codeElement.textContent;

    // Escape HTML
    code = code.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;');

    const tokens = [];
    let regex = /(f?"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|\/\/.*|\b\d+(\.\d+)?\b|\b(public|static|final|fun|return|if|else|end|for|in|print|import|setprec|void|true|false|bool|int|float|list|str)\b/g;

    let lastIndex = 0;
    let match;

    while ((match = regex.exec(code)) !== null) {
        // Push plain text before match
        if (match.index > lastIndex) {
            tokens.push(code.slice(lastIndex, match.index));
        }

        const [fullMatch, strLiteral, _, keyword] = match;

        let span = '';
        if (strLiteral) {
            span = `<span class="string">${strLiteral}</span>`;
        } else if (fullMatch.startsWith('//')) {
            span = `<span class="comment">${fullMatch}</span>`;
        } else if (keyword) {
            span = `<span class="keyword">${keyword}</span>`;
        } else {
            span = `<span class="number">${fullMatch}</span>`;
        }

        tokens.push(span);
        lastIndex = regex.lastIndex;
    }

    // Push remaining text
    if (lastIndex < code.length) {
        tokens.push(code.slice(lastIndex));
    }

    codeElement.innerHTML = tokens.join('');
}


// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === document.getElementById('example-modal')) {
        hideExample();
    }
});