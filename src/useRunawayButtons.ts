import { ref, onMounted } from "vue";

interface Button {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function useRunawayButtons(buttonCount: number = 3) {
  const buttons = ref<Button[]>([]);

  // Initialize buttons randomly without overlap
  onMounted(() => {
    for (let i = 0; i < buttonCount; i++) {
      let x: number = 0,
        y: number = 0;
      let safe = false;
      while (!safe) {
        x = Math.random() * 400 + 50;
        y = Math.random() * 400 + 50;
        safe = true;
        for (const b of buttons.value) {
          if (Math.abs(b.x - x) < 110 && Math.abs(b.y - y) < 50) {
            safe = false;
            break;
          }
        }
      }
      buttons.value.push({
        x,
        y,
        width: 100,
        height: 40,
      });
    }
  });

  function isOverlapping(b1: Button, b2: Button) {
    return !(
      b1.x + b1.width < b2.x ||
      b1.x > b2.x + b2.width ||
      b1.y + b1.height < b2.y ||
      b1.y > b2.y + b2.height
    );
  }

  function moveButton(
    index: number,
    mouseX: number,
    mouseY: number,
    containerWidth: number,
    containerHeight: number,
  ) {
    const button = buttons.value[index]!;
    const dx = button.x + button.width / 2 - mouseX;
    const dy = button.y + button.height / 2 - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 100) {
      let moveX = (dx / distance) * 50;
      let moveY = (dy / distance) * 50;

      let newX = button.x + moveX;
      let newY = button.y + moveY;

      // WRAP-AROUND: teleport instantly to opposite side if hitting edge
      if (newX < 0) newX = containerWidth - button.width;
      else if (newX + button.width > containerWidth) newX = 0;

      if (newY < 0) newY = containerHeight - button.height;
      else if (newY + button.height > containerHeight) newY = 0;

      // Prevent overlap with other buttons
      for (let i = 0; i < buttons.value.length; i++) {
        if (i !== index) {
          const other = buttons.value[i]!;
          const tempButton = { ...button, x: newX, y: newY };
          if (isOverlapping(tempButton, other)) {
            // Push away slightly to avoid overlap
            if (dx >= 0) newX = Math.max(other.x - button.width - 5, 0);
            else
              newX = Math.min(
                other.x + other.width + 5,
                containerWidth - button.width,
              );

            if (isOverlapping({ ...button, x: newX, y: newY }, other)) {
              if (dy >= 0) newY = Math.max(other.y - button.height - 5, 0);
              else
                newY = Math.min(
                  other.y + other.height + 5,
                  containerHeight - button.height,
                );
            }
          }
        }
      }

      button.x = newX;
      button.y = newY;
    }
  }

  return { buttons, moveButton };
}
