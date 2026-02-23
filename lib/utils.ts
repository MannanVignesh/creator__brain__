import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

export function formatEngagement(rate: number): string {
    return (rate * 100).toFixed(2) + '%';
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function daysAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
}

export function heatmapColor(value: number, max: number = 100): string {
    const intensity = Math.min(value / max, 1);
    // Return a cyan-based opacity based on normalized value
    return `rgba(6, 182, 212, ${0.1 + intensity * 0.9})`;
}

export function postTypeColor(type: string): string {
    switch (type.toLowerCase()) {
        case 'reel':
        case 'video':
            return '#06B6D4'; // Cyan
        case 'image':
        case 'photo':
            return '#7C3AED'; // Purple
        case 'carousel':
        case 'album':
            return '#A78BFA'; // Light Purple
        default:
            return '#6366f1';
    }
}

export function postTypeLabel(type: string): string {
    switch (type.toLowerCase()) {
        case 'reel': return 'Reel';
        case 'video': return 'Video';
        case 'image':
        case 'photo': return 'Image';
        case 'carousel':
        case 'album': return 'Carousel';
        default: return type.charAt(0).toUpperCase() + type.slice(1);
    }
}

export const NICHE_LABELS: Record<string, string> = {
    'tech': 'Tech & Gadgets',
    'lifestyle': 'Lifestyle & Daily',
    'fashion': 'Fashion & Style',
    'fitness': 'Health & Fitness',
    'food': 'Food & Cooking',
    'travel': 'Travel & Adventure',
    'business': 'Business & Finance',
    'education': 'Education & Learning',
    'entertainment': 'Movies & Entertainment',
    'art': 'Art & Design'
};
