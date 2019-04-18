<strong>Node:</strong> <?php print $sync_info['title']; ?><br />
<strong>Originally synced:</strong> <?php print format_date($sync_info['timestamp'], 'medium'); ?><br />
<strong>Synced by:</strong> <?php print $sync_info['name']; ?><br />
<a href="/node/<?php print $sync_info['nid']; ?>/edit">View current version source</a><br />
<?php if(isset($sync_info['old_vid'])): ?>
<a href="/node/<?php print $sync_info['nid']; ?>/revisions/view/<?php print $sync_info['old_vid']; ?>/<?php print $sync_info['vid']; ?>">View diff of old version vs current version</a><br />
<?php endif; ?>
<br />
<?php foreach($sync_items as $site_name => $sync_item): ?>
  <?php
  $domain = pgc_sync_get_domain_from_sitename($site_name);
  $domain = $domain[$site_name];
  $edit_link = $domain."/node/".$sync_info['uuid']."/edit";
  $view_link = $domain."/node/".$sync_info['uuid'];
  ?>
<table>
  <thead>
    <th>Site Name: <?php print $site_name; ?></th>
    <th>Status: <?php print pgc_sync_get_status_string($sync_info['status']); ?></th>
  </thead>
  <tbody>
  <?php foreach($sync_item as $field_name => $field): ?>
  <?php $new_node = ($field_name == 'All fields') ? true : false; ?>
  <?php if((strlen($field['client']) == 0 && strlen($field['master']) == 0) || in_array($field['status'], array(PGC_SYNC_FORCED, PGC_SYNC_SKIPPED, PGC_SYNC_COMPLETED))):  ?>
    <tr class="no-changes">
      <td><strong>Field:</strong> <?php print $field_name; ?></td>
      <td><strong>Status:</strong> <?php print pgc_sync_get_status_string($field['status']); ?></td>
    </tr>
  <?php else: ?>
    <tr class="overridden top">
      <td><strong>Field:</strong> <?php print $field_name; ?></td>
      <td><strong>Status:</strong> <?php print pgc_sync_get_status_string($field['status']); ?></td>
    </tr>
    <tr class="overridden bottom">
      <td class="master"><strong>Original:</strong><br /><?php print diff_get_inline(htmlspecialchars($field['client']), htmlspecialchars($field['master'])); ?></td>
      <td class="client"><strong>Client version:</strong><br /><?php print diff_get_inline(htmlspecialchars($field['master']), htmlspecialchars($field['client'])); ?></td>
    </tr>
  <?php endif; ?>
  <?php endforeach; ?>
  <?php if($sync_info['status'] == 2): ?>
  <tr>
    <td colspan="2">
      <a href="/admin/pgc-sync/nodes/force-skip/fields/<?php print $sync_info['id']; ?>/<?php print $site_name; ?>">Force/Skip updates</a>
      | <a href="/admin/pgc-sync/log/nodes/<?php print $sync_info['id']; ?>/complete/<?php print $site_name; ?>">Mark as complete</a>
      | <a href="<?php print $edit_link; ?>" target="_blank">Edit on client site</a>
    </td>
  </tr>
  <?php endif; ?>
  <?php if($new_node): ?>
    <tr>
      <td colspan="2">
        <a href="<?php print $view_link; ?>" target="_blank">View on client site</a>
        | <a href="<?php print $edit_link; ?>" target="_blank">Edit on client site</a>
      </td>
    </tr>
  <?php endif; ?>
  </tbody>
</table>
<?php endforeach; ?>