/*
* Zadání úkolu
* Vaším úkolem bude implementovat funkci aggregate. Funkce má spočítat souhrnou hodnotu cesty od vybraného uzlu stromu ke kořeni.
* 
* Funkce obdrží následující argumenty:
* 
* node - Uzel v stromu kde začíná cesta ke kořeni kterou má funkce zpracovat.
* nodeType - Typ uzlů, které má funkce zpracovat. Uzly jiných typů na cestě má funkce přeskočit.
* startingValue - Počáteční hodnota (celé číslo) se kterou má funkce začít výpočet.
* 
* Uzel stromu má následující strukturu:
* 
* parent - Rodič uzlu. Pokud je aktuální uzel kořenem stromu, hodnota bude prázdná (null/nil/None).
* children - Seznam potomků uzlu.
* type - Typ uzlu.
* value - Hodnota uzlu jako celé číslo.
* operation - Matematická operace, kterou má funkce aggregate provést při zpracování uzlu a aktuálního mezi-výsledku. Hodnota bude ADD pro sčítání nebo MULTIPY pro násobení.
* 
* Předpokládejte, že funkce vždy obdrží validní vstup.
* 
* Funkce má za úkol pro každý uzel stromu na ceste ke kořeni použít operaci uvedenou na daném uzlu na hodnotu aktuálního uzlu a aktuální mezi-výsledek. Po zpracování kořene stromu má funkce vrátit výsledek. Ostatní uzly stromu má funkce ignorovat.
* 
* V řešení nepoužívejte žádné knihovny nebo nástroje které nejsou součástí zvoleného jazyka nebo jeho standardní knihovny.
* 
* Příklad použití a návratové hodnoty
* node = {parent: null, children: [], type: 'foo', value: 2, operation: Operation.MULTIPLY}aggregate (node, 'foo', 3)6
* 
* aggregate(node, 'bar', 1)1
*/

const Operation = {
  ADD: '+',
  MULTIPLY: '*'
}

const node = {
  parent: null,
  children: [],
  type: 'foo',
  value: 2,
  operation: Operation.MULTIPLY
}

// Test Data:
const rootNode = {
  parent: null,
  children: [
    {
      parent: null,
      children: [
        {
          parent: null,
          children: [],
          type: 'bar',
          value: 2,
          operation: Operation.ADD
        }
      ],
      type: 'foo',
      value: 2,
      operation: Operation.ADD
    },
    {
      parent: null,
      children: [],
      type: 'foo',
      value: 3,
      operation: Operation.MULTIPLY
    }
  ],
  type: 'bar',
  value: 4,
  operation: Operation.MULTIPLY
}

rootNode.children[0].parent = rootNode
rootNode.children[0].children[0].parent = rootNode.children[0]
rootNode.children[1].parent = rootNode

/* 
* node - Uzel v stromu kde začíná cesta ke kořeni kterou má funkce zpracovat.
* nodeType - Typ uzlů, které má funkce zpracovat. Uzly jiných typů na cestě má funkce přeskočit.
* startingValue - Počáteční hodnota (celé číslo) se kterou má funkce začít výpočet.
* return - Souhrn hodnot cesty od uzlu ke kořeni.
*/
function aggregate(node, nodeType, startingValue) {
  if (!node || (nodeType !== node.type && !node.parent)) {
    return startingValue
  } else if (nodeType !== node.type && node.parent) {
    return aggregate(node.parent, nodeType, startingValue)
  }

  switch (node.operation) {
    case '+':
      startingValue += node.value;
      break
    case '*':
      startingValue *= node.value;
      break
  }

  return aggregate(node.parent, nodeType, startingValue);
}

console.log(aggregate(node, 'foo', 3)) // => 6
console.log(aggregate(node, 'bar', 1)) // => 1

console.log(aggregate(rootNode.children[0], 'foo', 3)) // => 5
console.log(aggregate(rootNode.children[1], 'foo', 3)) // => 9

console.log(aggregate(rootNode.children[0].children[0], 'bar', 3)) // => 20