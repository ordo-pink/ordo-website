---
slug: "/blog/markdown-basics"
date: 2022-06-15
title: "Азы Markdown"
---

Если весь текст будет выглядеть одинаково, то чтение его превратится в омерзительнейший процесс, что никто не станет в него вовлекаться.

## Оглавление

1. [Про маркдаун](/blog/markdown-basics)
2. [Как связывать мысли](/blog/linking-thinking)
3. [Про визуализацию заметок в Ordo](/blog/using-ordo-components)

Поэтом стоит разобраться, как его украсить и упорядочить. Начнем со второго.

Чтобы сделать из строки заголовок, нужно в начале строки добавить символ `#` и поставить пробел. Так получается
заголовок первого уровня. Например такой.

`# Заголовок первого уровня`

Если поставить две решетки подряд, а потом посавить пробел, то получится заголовок второго уровня. Всего так можно
создать пять уровней заголовков. Это потому, что если вам нужно больше заголовков, то что-то явно пошло не так.

---

```markdown
# Заголовок первого уровня

## Заголовок второго уровня

### Заголовок третьего уровня

#### Заголовок четвертого уровня

##### Заголовок пятого уровня
```

# Заголовок первого уровня

## Заголовок второго уровня

### Заголовок третьего уровня

#### Заголовок четвертого уровня

##### Заголовок пятого уровня

---

Заголовок пятого уровня выглядит немногим крупнее текста обычного параграфа. Но по мере иерархического
углубления и сама мысль мельчает.

Кстати, специальные символы видны только в том случае, если каретка (вот эта вот палка, которая показывает, где сейчас
курсор) находится на той строке, где они используются. Это поведение можно изменить - достаточно зайти в настройки
(иконка шестеренки в левом нижнем углу, или комбинация клавиш **Ctrl/Cmd + ,**) и поставить галку напротив
_Always show markdown symbols_. В этом случае, символы будут отображаться постоянно. Способа полностью их убрать
на данный момент нет, и пока не планируется.

## Стилизация

- `Обратные кавычки` (\`\`) кладут текст в рамочку, чтобы лучше выделялся.
- **Двойные звездочки** (\*\*) и **двойные андерскоры** (\_\_) подсвечивают жирным.
- _Одинарные звездочки_ (\*) и _одинарные андерскоры_ (\_) делают курсив.
- ~~Двойные тильды~~ (\~\~) зачеркивают текст.

**Стили _можно ~~объединять~~_ `между` собой**.

---

Если поставить подряд три дефиса (---) в начале строки, то получится горизонтальная разделительная линия.

---

## Делишки

- [ ] Не нажато
- [x] Нажато

Если в начале строки использовать символы `[ ] ` (открывающаяся квадратная скобка, пробел, закрывающаяся квадратная скобка, пробел),
то в этой строке будет создан особый элемент. Хотя, чего в нём особенного - обыкновенный чекбокс. Нажимаешь, галочка ставится, еще раз
нажимаешь - галочка снимается. Также чекбокс можно поправить вручную, заменив `[ ] ` на `[x] `. Главная особенность чекбоксов
в том, что они отображаются в разделе _Checkboxes_ (**Ctrl + Shift + C**). В этом самом разделе собираются все существующие чекбоксы
в проекте, и можно с высоты птичьего полета взглянуть на то, что сделано, а что - не очень, после чего сделать осмысленные выводы о том, что
что-то не сделано, и оно - не очень.

[Далее](/blog/linking-thinking)