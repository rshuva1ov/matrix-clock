use chrono::Timelike;
use chrono_tz::Europe::Moscow;
use rand::Rng;
use serde::Serialize;
use tauri::{Builder, command as tauri_command};

#[derive(Serialize)]
pub struct MoscowTime {
    pub hours: u8,
    pub minutes: u8,
    pub seconds: u8,
}

#[derive(Serialize)]
pub struct MatrixRainFrame {
    pub columns: Vec<f32>,
}

#[tauri_command]
fn get_moscow_time() -> MoscowTime {
    let now = chrono::Utc::now().with_timezone(&Moscow);
    MoscowTime {
        hours: now.hour() as u8,
        minutes: now.minute() as u8,
        seconds: now.second() as u8,
    }
}

/// Генерирует один кадр "дождя": для каждой колонки возвращает интенсивность 0..1.
#[tauri_command]
fn generate_matrix_rain_frame(columns: u16) -> MatrixRainFrame {
    let mut rng = rand::thread_rng();

    let safe_columns = columns.clamp(8, 1024);

    let cols = (0..safe_columns)
        .map(|_| rng.gen::<f32>())
        .collect::<Vec<f32>>();

    MatrixRainFrame { columns: cols }
}

fn main() {
    Builder::default()
        .invoke_handler(tauri::generate_handler![get_moscow_time, generate_matrix_rain_frame])
        .run(tauri::generate_context!())
        .expect("error while running Matrix Clock Tauri application");
}

