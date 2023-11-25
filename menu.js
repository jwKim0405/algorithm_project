const convenienceStoreFoods = {
    ramen: [
      { name: "신라면", price: 2500, calories: 450 },
      { name: "너구리", price: 2000, calories: 380 },
      { name: "진라면", price: 3000, calories: 500 },
      { name: "삼양라면", price: 2800, calories: 420 },
      { name: "불닭볶음면", price: 3500, calories: 550 }
    ],
    beverage: [
      { name: "콜라", price: 1000, calories: 150 },
      { name: "아이스티", price: 1500, calories: 100 },
      { name: "오렌지 주스", price: 2000, calories: 180 },
      { name: "커피", price: 1200, calories: 80 },
      { name: "망고 스무디", price: 2500, calories: 220 }
    ],
    kimbap: [
      { name: "김치 김밥", price: 2500, calories: 300 },
      { name: "치즈 김밥", price: 2800, calories: 320 },
      { name: "참치 김밥", price: 3000, calories: 350 },
      { name: "새우 김밥", price: 2700, calories: 280 },
      { name: "불고기 김밥", price: 3200, calories: 400 }
    ],
    dessert: [
      { name: "아이스크림", price: 1500, calories: 200 },
      { name: "초코파이", price: 1200, calories: 180 },
      { name: "과일젤리", price: 1800, calories: 120 },
      { name: "카스텔라", price: 2000, calories: 250 },
      { name: "마카롱", price: 2500, calories: 180 }
    ]
  };
  
  function recommendDiet(userHeight, userWeight, budget) {
    const standardCalories = calculateStandardCalories(userHeight, userWeight);
    const foods = Object.values(convenienceStoreFoods).flat();
  
    const dpTable = Array(budget + 1).fill(0).map(() => Array(standardCalories + 1).fill(0));
  
    for (let i = 0; i < foods.length; i++) {
      for (let j = budget; j >= foods[i].price; j--) {
        for (let k = standardCalories; k >= foods[i].calories; k--) {
          dpTable[j][k] = Math.max(dpTable[j][k], dpTable[j - foods[i].price][k - foods[i].calories] + 1);
        }
      }
    }
  
    let selectedFoods = [];
    let remainingBudget = budget;
    let remainingCalories = standardCalories;
  
    for (let i = foods.length - 1; i >= 0; i--) {
      if (remainingBudget >= foods[i].price && remainingCalories >= foods[i].calories && dpTable[remainingBudget][remainingCalories] === dpTable[remainingBudget - foods[i].price][remainingCalories - foods[i].calories] + 1) {
        selectedFoods.unshift(foods[i].name);
        remainingBudget -= foods[i].price;
        remainingCalories -= foods[i].calories;
      }
    }
  
    return {
      selectedFoods,
      totalCalories: standardCalories - remainingCalories,
      totalCost: budget - remainingBudget
    };
  }
  
  function calculateStandardCalories(height, weight) {
    const bmi = weight / Math.pow(height / 100, 2);
    return Math.round(30 * bmi + 70);
  }
  
  // 사용자 정보
  const userHeight = 168;
  const userWeight = 62;
  const userBudget = 9000;
  
  // 추천된 식단
  const recommendedDiet = recommendDiet(userHeight, userWeight, userBudget);
  
  // 결과 출력
  console.log("추천된 식단:");
  console.log(recommendedDiet.selectedFoods);
  console.log("총 칼로리:", recommendedDiet.totalCalories, "kcal");
  console.log("총 비용:", recommendedDiet.totalCost, "원");
  