import { Button } from "@/components/ui/button";
import { useHistoryStore } from "@/store/historyStore";

export default function HistoryTab() {
  const { uploads, verifications, clearHistory } = useHistoryStore();

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <div className="space-y-10">
      {/* Upload Section */}
      <div>
        <h2 className="font-semibold text-lg mb-3">Recent Uploads</h2>
        {uploads.length === 0 ? (
          <p className="text-sm text-muted-foreground">No uploads yet.</p>
        ) : (
          <ul className="space-y-3">
            {uploads.map((u, i) => (
              <li key={i} className="p-4 rounded border bg-gray-50 shadow-sm">
                <div className="font-medium">{u.name}</div>
                <div className="text-xs text-muted-foreground">
                  {formatTime(u.timestamp)}
                </div>
                <a
                  href={`https://ipfs.io/ipfs/${u.cid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-xs underline inline-block mt-1"
                >
                  🔗 View Uploaded CID
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Verification Section */}
      <div>
        <h2 className="font-semibold text-lg mb-3">Recent Verifications</h2>
        {verifications.length === 0 ? (
          <p className="text-sm text-muted-foreground">No verifications yet.</p>
        ) : (
          <ul className="space-y-3">
            {verifications.map((v, i) => (
              <li key={i} className="p-4 rounded border bg-green-50 shadow-sm">
                <div className="font-medium">{v.name}</div>
                <div className="text-xs text-muted-foreground">
                  {formatTime(v.timestamp)}
                </div>
                <a
                  href={`https://ipfs.io/ipfs/${v.cid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-xs underline inline-block mt-1"
                >
                  View Verified CID
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Clear Button */}
      {(uploads.length > 0 || verifications.length > 0) && (
        <Button
          onClick={clearHistory}
          variant="destructive"
          className="w-full sm:w-auto"
        >
          Clear All History
        </Button>
      )}
    </div>
  );
}
